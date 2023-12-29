import ResponsiveAppBar from "@/components/AppBar/AppBar";
import { Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface ILayout {
  children: ReactNode;
  title?: string;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <Grid container width={"100vw"} height={"100vh"}>
      <ResponsiveAppBar />
      <Grid container width={"100%"} height={"90%"}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
