import RemoveIcon from "@mui/icons-material/CloseOutlined";
import { Card, CardContent, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Dispatch, FC, memo } from "react";

interface PropsPokemonDetail {
  pokemon: object;
  setActivePokemon: Dispatch<React.SetStateAction<object>>;
}

const PokemonDetail: FC<PropsPokemonDetail> = memo(
  ({ pokemon, setActivePokemon }) => {
    const handleClose = () => {
      setActivePokemon({});
    };
    return (
      <Card sx={{ bgcolor: "rgba(200, 190, 195, 0.4)" }}>
        <IconButton
          onClick={handleClose}
          aria-label="Eliminar"
          sx={{ left: "10px", color: "red" }}
        >
          <RemoveIcon />
        </IconButton>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="card-img">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={`Pokemon ${pokemon.name}`}
            />
          </div>
          <div className="card-info">
            <span className="pokemon-id">N° {pokemon.id}</span>
            <Typography>{pokemon.name.toUpperCase()}</Typography>
            <div className="card-types">
              {pokemon.types.map((type) => (
                <span key={type.type.name} className={type.type.name}>
                  {type.type.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },
  (prevProps, nextProps) => prevProps.pokemon === nextProps.pokemon
);

export default PokemonDetail;
