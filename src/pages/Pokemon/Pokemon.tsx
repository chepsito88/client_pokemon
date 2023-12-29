import { DialogComponent, HeaderSectionPage, TableList } from "@/components";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import {
  deletePokemon,
  editPokemon,
  newPokemon,
  titlePokemon,
} from "@/constants";
import { useAppDispatch, useAppSelector, useFetchAndLoad } from "@/hooks";
import { Layout } from "@/layout";
import {
  createPokemon,
  deletedPokemon,
  getPokemon,
  getPokemonById,
  updatedServicesPokemon,
} from "@/services";
import {
  addPokemon,
  deletePokemonById,
  setPokemon,
  updatePokemon,
} from "@/store/pokemon/pokemon";
import { ActionIcon, Group } from "@mantine/core";
import { DeleteOutline, EditOutlined, PictureAsPdf } from "@mui/icons-material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

const initialState = {
  _id: "",
  name: "",
  description: "",
};

const Pokemon = () => {
  const { callEndpoint } = useFetchAndLoad();
  const dispatch = useAppDispatch();
  const { pokemon } = useAppSelector((root) => root.pokemonState);

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [state, setState] = useState(initialState);
  const [activePokemon, setActivePokemon] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { data } = await callEndpoint(getPokemon());
    dispatch(setPokemon(data));
  };

  const handleApiError = (error: any) => {
    if (error.response && error.response.data && error.response.data.message) {
      const { message } = error.response.data;
      setErrorMessage(message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onClosedModal = () => {
    setShowModal(false);
    setState(initialState);
    setActivePokemon("");
    setErrorMessage("");
  };

  const columns = [
    { accessor: "name", title: "Name", textAlignment: "center" },
    { accessor: "description", title: "Description", textAlignment: "center" },
    {
      accessor: "acciones",
      title: "ACTIONS",
      textAlignment: "center",
      render: ({
        _id,
        name,
        description,
      }: {
        _id: string;
        name: string;
        description: string;
      }) => renderOpcion(_id, name, description),
    },
    {
      accessor: "pdf",
      title: "PDF",
      textAlignment: "center",
      render: ({ _id }: { _id: string }) => renderPDF(_id),
    },
  ];

  const renderPDF = (id: string) => {
    return (
      <Group style={{ display: "flex", justifyContent: "center" }}>
        <ActionIcon color="blue" onClick={() => handleDowloadPdf(id)}>
          <PictureAsPdf />
        </ActionIcon>
      </Group>
    );
  };

  const handleDowloadPdf = async (id: string) => {
    try {
      const { data } = (await callEndpoint(getPokemonById(id))) as {
        data: { _id: string; name: string; description: string };
      };
      generateAndDownloadPDF(data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const generateAndDownloadPDF = (data: {
    _id: string;
    name: string;
    description: string;
  }) => {
    const pdf = generatePDF(data);
    saveAs(pdf.output("blob"), `${data.name}_info.pdf`);
  };

  const generatePDF = (data: {
    _id: string;
    name: string;
    description: string;
  }) => {
    const { _id, name, description } = data;
    const pdf = new jsPDF();

    pdf.text(`Pokemon ID: ${_id}`, 20, 20);
    pdf.text(`Name: ${name}`, 20, 30);
    pdf.text(`Description: ${description}`, 20, 40);

    return pdf;
  };

  const renderOpcion = (_id: string, name: string, description: string) => {
    return (
      <Group style={{ display: "flex", justifyContent: "center" }}>
        <ActionIcon
          color="blue"
          onClick={() => handleActioModal(editPokemon, _id, name, description)}
        >
          <EditOutlined />
        </ActionIcon>
        <ActionIcon
          color="red"
          onClick={() =>
            handleActioModal(deletePokemon, _id, name, description)
          }
        >
          <DeleteOutline />
        </ActionIcon>
      </Group>
    );
  };

  const handleActioModal = (
    titleModal: string,
    _id = "",
    name = "",
    description = ""
  ) => {
    if (_id !== undefined) setActivePokemon(_id);
    if (titleModal === editPokemon) {
      setState({ ...state, name, description });
    }
    setTitleModal(titleModal);
    setShowModal(true);
  };

  const renderBody = () => {
    return (
      <>
        {titleModal === deletePokemon ? (
          <Grid item sx={{ width: "100%" }}>
            You really want to eliminate <strong>the Pokemon!</strong>
          </Grid>
        ) : (
          <Grid container display={"flex"} justifyContent={"center"}>
            <Grid item mt={1} md={6} p={1}>
              <TextField
                label="Pokemon"
                type="text"
                placeholder="Pokemon"
                name="name"
                value={state.name}
                onChange={onChange}
                variant="outlined"
                disabled={titleModal === editPokemon}
              />
            </Grid>
            <Grid item mt={1} md={6} p={1}>
              <TextField
                label="Description"
                type="text"
                placeholder="Description"
                name="description"
                value={state.description}
                onChange={onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item mt={1} md={12} p={1}>
              <Typography>{errorMessage}</Typography>
            </Grid>
          </Grid>
        )}
      </>
    );
  };

  const performPokemonAction = async (action: string, payload?: any) => {
    try {
      let response;

      switch (action) {
        case newPokemon:
          response = await callEndpoint(createPokemon(payload));
          dispatch(addPokemon(response.data));
          break;
        case deletePokemon:
          response = (await callEndpoint(deletedPokemon(payload))) as {
            data: { _id: string };
          };
          dispatch(deletePokemonById(response.data._id));
          break;
        case editPokemon:
          response = await callEndpoint(
            updatedServicesPokemon(payload._id, payload.data)
          );
          dispatch(updatePokemon(response.data));
          break;
        default:
          break;
      }

      onClosedModal();
    } catch (error) {
      handleApiError(error);
    }
  };

  const onNewPokemon = async () => {
    const pokemon = {
      name: state.name,
      description: state.description,
    };

    performPokemonAction(newPokemon, pokemon);
  };

  const onDeletedPokemon = async () => {
    performPokemonAction(deletePokemon, activePokemon);
  };

  const onEditPokemon = async () => {
    const newPokemon = {
      description: state.description,
    };
    performPokemonAction(editPokemon, { _id: activePokemon, data: newPokemon });
  };

  const onClickPokemon = () => {
    handleActioModal(newPokemon);
  };

  const onSave = () => {
    titleModal === newPokemon
      ? onNewPokemon()
      : titleModal === deletePokemon
      ? onDeletedPokemon()
      : titleModal === editPokemon && onEditPokemon();
  };

  const labelButton = titleModal === deletePokemon ? "DELETE" : "SAVE";
  const colorButton = titleModal === deletePokemon ? "error" : "success";

  return (
    <Layout>
      <Grid container sx={{ height: "100%", width: "100%", p: 2 }}>
        <Grid
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"10%"}
          item
          p={2}
        >
          <HeaderSectionPage
            title={titlePokemon}
            titleButton={newPokemon}
            onClick={onClickPokemon}
            icon={<PersonAddOutlinedIcon />}
          />
        </Grid>
        <Grid container sx={{ height: "90%", width: "100%", p: 2 }}>
          <TableList data={pokemon} columns={columns} />
          <DialogComponent
            title={titleModal}
            open={showModal}
            onClose={onClosedModal}
            content={renderBody()}
            labelBotton={labelButton}
            colorButton={colorButton}
            onActionButton={onSave}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Pokemon;
