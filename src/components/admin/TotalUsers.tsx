import React from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  GridSize,
  GridProps,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { useFirestore } from "../../contexts";
import DashboardItem from "./DashboardItem";
import { Variant } from "@material-ui/core/styles/createTypography";
import { createdInLastWeek, createdInLastDay } from "../../utils";

const TotalUsers = () => {
  const { getCollection } = useFirestore() as IFirestoreContext;
  const [totalUsers, setTotalUsers] = React.useState<number>(0);
  const [newWeeklyUsers, setNewWeeklyUsers] = React.useState<number>(0);
  const [newDailyUsers, setNewDailyUsers] = React.useState<number>(0);

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    getCollection("users")
      .then((snapshot: Array<any>) => {
        setTotalUsers(snapshot.length);
        setNewWeeklyUsers(snapshot.filter(createdInLastWeek).length);
        setNewDailyUsers(snapshot.filter(createdInLastDay).length);
      })
      .catch(() => {
        setTotalUsers(0);
        setNewWeeklyUsers(0);
        setNewDailyUsers(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getCollection]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <DashboardItem
          data={
            <Grid container>
              <UserCount
                count={totalUsers}
                label="Total Users"
                width={12}
                primaryTypographyVariant="h2"
                secondaryTypographyVariant="h4"
              />
              <UserCount
                count={newWeeklyUsers}
                label="New Weekly Users"
                width={6}
                primaryTypographyVariant="h3"
                secondaryTypographyVariant="body1"
              />
              <UserCount
                count={newDailyUsers}
                label="New Daily Users"
                width={6}

                primaryTypographyVariant="h3"
                secondaryTypographyVariant="body1"
              />
            </Grid>
          }
          loading={loading}
          title="Users"
          icon={Person}
        />
      )}
    </>
  );
};

export default TotalUsers;

interface IUserCount extends GridProps {
  count: number;
  label: string;
  width: GridSize | boolean | undefined;
  primaryTypographyVariant: Variant | "inherit" | undefined;
  secondaryTypographyVariant: Variant | "inherit" | undefined;
}


const UserCount = ({
  count,
  label,
  width,
  primaryTypographyVariant,
  secondaryTypographyVariant,
  ...props
}: IUserCount) => {
  return (
    <Grid item xs={width} className={props.className} >
      <Typography
        align="center"
        variant={primaryTypographyVariant}
      >{`${count.toString()}`}</Typography>
      <Typography align="center" variant={secondaryTypographyVariant}>
        {label}
      </Typography>
    </Grid>
  );
};
