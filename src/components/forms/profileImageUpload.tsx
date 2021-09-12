import React from "react";
import { Typography, Button, makeStyles, CircularProgress } from "@material-ui/core";
import { useAuth } from "../../contexts/authContext";
import { useStorage } from "../../contexts/storageContext";
import { UploadResult, getDownloadURL } from "firebase/storage";
import { Camera, CameraAlt } from "@material-ui/icons";

interface Props {
  setTempImage: (image: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
    padding: theme.spacing(1),
  },
  fileInput: {
    display: "none",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const ProfileImageUpload = ({setTempImage}: Props) => {
  const classes = useStyles();
  const { currentUser, updateUserPhoto } = useAuth() as IAuthContext;
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const { uploadFile } = useStorage() as IStorageContext;
  const [error, setError] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setTempImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // Check for file size and errors
    if (!file) {
      setError("No file selected");
      return; // don't submit
    }
    if (file.size > 5000000) {
      setError("File must be less than 5MB");
      return; // don't submit
    }
    if (!currentUser) {
      setError("No user logged in");
      return; // don't submit
    }
    // Upload file to Firebase Storage
    const result: UploadResult =
      await uploadFile({
        file: file,
        path: `profileImages/${currentUser?.uid}/${file.name}`,
      });
    if (!result) {
      setError("Error uploading file");
      return; // don't submit
    }
    // Get the download URL
    const downloadUrl = await getDownloadURL(result.ref);
    console.log(downloadUrl)
    // Update the user's profile image with the URL
    await updateUserPhoto(downloadUrl);

    setLoading(false);
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={classes.fileInput}
      />
      <label htmlFor="file-input">
        {!file && <Button
          variant="contained"
          color="primary"
          endIcon={<CameraAlt />}
          component="span"
        />}
      </label>
        {error && (
          <Typography variant="h6" color="error">
            {error.toString()}
          </Typography>
        )}
        {file && <Button variant="contained" color="secondary" disabled={loading} type="submit">{loading ? <CircularProgress /> : "Save"}</Button>}
      </form>
    </>
  );
};

export default ProfileImageUpload;
