import React from "react";
import {
  Grid,
  makeStyles,
  Theme,
  Paper,
  Typography,
  CircularProgress,
  GridSize,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
   
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    "& svg": {
      marginBottom: theme.spacing(1),
    },
  },
  dataBox: {
      height: "100%",
  },
}));

interface Props extends React.ComponentProps<typeof Grid> {
  title: string;
  data: React.ReactNode | React.ReactNodeArray;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  loading: boolean;
  xs?: boolean | GridSize | undefined;
  md?: boolean | GridSize | undefined;
  lg?: boolean | GridSize | undefined;
}

const DashboardItem = ({ title, data, icon, loading, xs = 12, md = 6, lg = 3, ...props }: Props) => {
  const classes = useStyles();
  return (
    <Grid item xs={xs} md={md} lg={lg} {...props} >
      <Typography variant="h4" className={classes.title}>
        <span>{title}</span>
      </Typography>
      <Paper >
          {loading ? <CircularProgress /> : data}
      </Paper>
    </Grid>
  );
};


export default DashboardItem;