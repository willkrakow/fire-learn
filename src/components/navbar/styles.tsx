import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    menuLink: {
        color: theme.palette.primary.contrastText,
        textDecoration: "none",
        "&:hover": {
            color: theme.palette.primary.main,
        },
    },
}));