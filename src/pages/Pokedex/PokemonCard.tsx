import { useFetchAndLoad } from "@/hooks";
import { getOnePokemon } from "@/services";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Dispatch, FC, memo } from "react";

interface PropsPokemonCard {
  name: string;
  url: string;
  setActivePokemon: Dispatch<React.SetStateAction<object>>;
  isVisibleDetail: boolean;
}

const PokemonCard: FC<PropsPokemonCard> = memo(
  ({ name, url, setActivePokemon, isVisibleDetail }) => {
    const parts = url.split("/");
    const { callEndpoint } = useFetchAndLoad();
    const pokemonId = parts[parts.length - 2];

    const init = async () => {
      try {
        const { data } = await callEndpoint(getOnePokemon(pokemonId));
        setActivePokemon(data);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Grid item md={isVisibleDetail ? 6 : 4} p={2}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {name.toUpperCase()}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={init} variant="contained">
              SHOW
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  },
  (prevProps, nextProps) => prevProps.name === nextProps.name
);

export default PokemonCard;
