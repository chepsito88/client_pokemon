import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, ReactNode } from "react";

interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  labelBotton: string;
  colorButton: string;
  onActionButton: () => void;
}

const DialogComponent: FC<DialogComponentProps> = ({
  open,
  onClose,
  title,
  content,
  labelBotton,
  colorButton,
  onActionButton,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          color: "black",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          color: "black",
          paddingTop: "20px !important",
        }}
      >
        {content}
      </DialogContent>
      <DialogActions
        sx={{
          color: "black",
        }}
      >
        <Button fullWidth={false} variant="contained" onClick={onClose}>
          CANCEL
        </Button>
        <Button
          sx={{ marginLeft: "5px" }}
          variant="contained"
          color={
            colorButton as
              | "inherit"
              | "primary"
              | "secondary"
              | "success"
              | "error"
              | "info"
              | "warning"
          }
          onClick={onActionButton}
        >
          {labelBotton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
