import React from "react";
import {
  Table,
  CircularProgress,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  TableCell,
} from "@material-ui/core";
import { useFirestore } from "src/contexts/firestoreContext";
import { getDateStringFromTimestamp } from "src/utils/parseTimestamp";
import { RouterButton } from "src/components/buttons";
import { useRouteMatch } from "react-router";
import { Edit } from "@material-ui/icons";


const UserTable = () => {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<UserDocument[]>([]);
  const { getCollection } = useFirestore() as IFirestoreContext;
  const { url } = useRouteMatch()
  React.useEffect(() => {
    setLoading(true);
    getCollection("users")
      .then(setUsers)
      .finally(() => setLoading(false));
  }, [getCollection]);
  return (
    <>
      <Typography variant="h3">User Manager</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "ID", "Email", "Created At", "Options"].map((label) => (
                <TableCell key={label}>
                  <Typography variant="h4">{label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                {[
                  user.data.name,
                  user.id,
                  user.data.email,
                  getDateStringFromTimestamp(user.data.created_at),
                ].map((value, index) => (
                  <TableCell key={index}>
                    <Typography variant={index === 0 ? "subtitle1" : "body1"}>
                      {value}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell>
                    <RouterButton href={`${url}/${user.id}`}><Edit fontSize="inherit" color="secondary" /></RouterButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default UserTable;