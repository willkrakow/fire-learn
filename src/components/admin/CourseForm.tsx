import React from "react";
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  makeStyles,
  Theme
} from "@material-ui/core";
import { useFirestore } from "../../contexts";

const useStyles = makeStyles((theme: Theme) => ({
  input: theme.typography.body1,
  titleInput: theme.typography.h4,
  button: {
    marginTop: theme.spacing(2)
  }
}))


interface ICourseForm {
  course: Course;
  url: string;
}

interface IErrors {
  name?: string;
  description?: string;
  price?: string;
  author?: string;
  organization?: string;
}

function validate(values: any) {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.price) {
    errors.price = "Required";
  }

  if (values.price < 0) {
    errors.price = "Must be positive";
  }

  if (values.price.length > 10) {
    errors.price = "Must be less than 10 characters";
  }

  if (values.price.length < 3) {
    errors.price = "Must include cents (or .00)";
    return errors;
  }
}

const CourseForm = ({ course, url }: ICourseForm) => {
  const [formData, setFormData] = React.useState<Course>({ ...course });
  const [errors, setErrors] = React.useState<IErrors>({});
  const { updateDocument } = useFirestore() as IFirestoreContext
  const [ loading, setLoading ] = React.useState(false);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (loading || !formData) return;
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // validate form
    const errors = validate(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // submit form
      updateDocument({ path: `courses/${course.id}`, data: formData });
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <CircularProgress />}
      {formData ? (
        <>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  InputProps={{
                    className: classes.titleInput,
                  }}
                  error={!!errors.name}
                  name="name"
                  color="primary"
                  value={formData?.data.name}
                  onChange={handleChange}
                  helperText={errors?.name}
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  error={!!errors.description}
                  multiline
                  minRows={3}
                  color="primary"
                  name="description"
                  value={formData?.data.description}
                  onChange={handleChange}
                  label="Description"
                  helperText={errors?.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  error={!!errors.organization}
                  color="primary"
                  name="organization"
                  value={formData?.data.organization}
                  onChange={handleChange}
                  label="Organization"
                  helperText={errors?.organization}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  error={!!errors.author}
                  color="primary"
                  name="author"
                  value={formData?.data.author}
                  onChange={handleChange}
                  label="Author"
                  helperText={errors?.author}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  error={!!errors.price}
                  type="number"
                  color="primary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                    className: classes.input,
                  }}
                  label="Price"
                  name="price"
                  value={formData?.data.price}
                  onChange={handleChange}
                  helperText={errors?.price}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              Save
            </Button>
          </form>
        </>
      ) : (
        <div>404</div>
      )}
    </>
  );
};

export default CourseForm;
