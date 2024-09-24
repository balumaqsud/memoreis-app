import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  main: {
    borderRadius: "10px",
  },
  paper: {
    marginTop: useTheme().spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: useTheme().spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: useTheme().spacing(1),
    },
  },

  avatar: {
    margin: useTheme().spacing(1),
    backgroundColor: useTheme().palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: useTheme().spacing(3),
    flexDirection: "row",
  },
  submitt: {
    margin: useTheme().spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: useTheme().spacing(2),
    textAlign: "center",
  },
}));

export default useStyles;
