import logo from "@/assets/pokeapi.png";
import { pokedexPath, pokemonPath } from "@/constants";
import { useRedirectTo } from "@/hooks";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
const pages = [
  { title: "Pokedex", path: pokedexPath },
  { title: "Pokemon", path: pokemonPath },
];
const  ResponsiveAppBar=()=> {
  const redirecTo = useRedirectTo();

  const handleItemMenu = (path: string) => {
    redirecTo(path);
  };

  return (
    <AppBar position="static" sx={{height:'10%'}}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo} width={100} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => handleItemMenu(page.path)}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
