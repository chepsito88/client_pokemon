import { useFetchAndLoad } from "@/hooks";
import { Layout } from "@/layout";
import { getAllPokemons } from "@/services";
import { Group } from "@mantine/core";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import PokemonDetail from "./PokemonDetail";

const Pokedex = () => {
  const [pokemons, setpokemons] = useState<[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const [activePokemon, setActivePokemon] = useState({});

  const { callEndpoint } = useFetchAndLoad();
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const { data } = await callEndpoint(
        getAllPokemons({ limit: limit, page: page, search: search })
      );
      setpokemons(data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFindPokemon = () => {
    init();
  };

  const isVisibleDetail = Boolean(activePokemon.name);

  return (
    <Layout>
      {!loading ? (
        "Loading ..."
      ) : (
        <Grid width={"100%"} height={"100%"}>
          <Grid
            item
            display={"flex"}
            justifyContent={"center"}
            height={"15%"}
            md={12}
            p={2}
          >
            <Group>
              <TextField
                type="number"
                label="Limit"
                placeholder="Limit"
                variant="outlined"
                value={limit}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  if (!isNaN(inputValue) && inputValue >= 1) {
                    setLimit(inputValue);
                  }
                }}
              />
              <TextField
                type="number"
                label="Page"
                placeholder="Page"
                variant="outlined"
                value={page}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  if (!isNaN(inputValue) && inputValue >= 1) {
                    setPage(inputValue);
                  }
                }}
              />

              <TextField
                type="text"
                label="Find Pokemon"
                placeholder="Find Pokemon"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleFindPokemon} variant="contained">
                Find
              </Button>
            </Group>
          </Grid>

          <Grid item md={12} width={"100%"} height={"85%"}>
            <Grid container width={"100%"} height={"100%"}>
              <Grid
                item
                md={isVisibleDetail ? 8 : 12}
                sx={{ height: "90%", overflowY: "scroll" }}
              >
                <Grid container height={"100%"}>
                  {pokemons.map((pokemon, index) => {
                    return (
                      <PokemonCard
                        key={index}
                        name={pokemon.name}
                        setActivePokemon={setActivePokemon}
                        url={pokemon.url}
                        isVisibleDetail={isVisibleDetail}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              {isVisibleDetail && (
                <Grid item md={4} p={2}>
                  <PokemonDetail
                    pokemon={activePokemon}
                    setActivePokemon={setActivePokemon}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default Pokedex;
