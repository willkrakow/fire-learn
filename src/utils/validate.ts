export function validateCourse(values: Course["data"]) {
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
  return errors;
}
