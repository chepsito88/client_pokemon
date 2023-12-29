import { Button, Grid, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface IHeaderSection {
  title: string;
  titleButton: string;
  onClick: () => void;
  icon: ReactNode;
  disableButton?: boolean;
}

const HeaderSectionPage: FC<IHeaderSection> = ({
  title,
  titleButton,
  onClick,
  icon,
  disableButton = false,
}) => {
  const handleButton = () => {
    onClick();
  };
  return (
    <Grid
      container
      width={"100%"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Typography sx={{ color: "#677483" }} variant="h4">
        {title}
      </Typography>
      <Button
        startIcon={icon}
        variant="contained"
        onClick={handleButton}
        disabled={disableButton}
      >
        {titleButton}
      </Button>
    </Grid>
  );
};

export default HeaderSectionPage;
