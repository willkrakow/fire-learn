import React from "react";
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { useFirestore } from "../../contexts";

interface ICourseForm {
  course: Course;
  url: string;
}

interface IErrors {
  name?: string;
  description?: string;
  price?: string;
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
              <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                error={!!errors.name}
                name="name"
                value={formData?.data.name}
                variant="outlined"
                onChange={handleChange}
                helperText={errors?.name}
                label="Name"
              />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                error={!!errors.description}
                multiline
                minRows={3}
                name="description"
                value={formData?.data.description}
                variant="outlined"
                onChange={handleChange}
                label="Description"
                helperText={errors?.description}
              />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                error={!!errors.price}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                label="Price"
                name="price"
                value={formData?.data.price}
                variant="outlined"
                onChange={handleChange}
                helperText={errors?.price}
              />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" type="submit">
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
