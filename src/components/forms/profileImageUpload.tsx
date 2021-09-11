import React from 'react'
import { Typography, Button, makeStyles } from '@material-ui/core';
import { useAuth } from '../../contexts/authContext';
import { useStorage } from '../../contexts/storageContext';
import { UploadResult, getDownloadURL } from 'firebase/storage';
import { User } from 'firebase/auth';
import { Photo, HourglassEmpty } from '@material-ui/icons'



const useStyles = makeStyles((theme) => ({
  fileInput: {
    display: "none",
  },
}));


const ProfileImageUpload = () => {
    const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const { uploadFile } = useStorage() as IStorageContext;
  const [error, setError] = React.useState("");
  const { currentUser, updateUserPhoto } = useAuth() as IAuthContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
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
    if (currentUser) {
      setError("No user logged in");
      return; // don't submit
    }
    // Upload file to Firebase Storage
    const url: UploadResult =
      (currentUser as User) &&
      ((await uploadFile({
        file: file,
        path: `profileImages/${currentUser?.uid}/${file.name}`,
      })) as UploadResult);
    if (!url) {
      setError("Error uploading file");
      return; // don't submit
    }
    // Get the download URL
    const downloadUrl = await getDownloadURL(url.ref);
    // Update the user's profile image with the URL
    await updateUserPhoto(downloadUrl);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={classes.fileInput}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          color="secondary"
          endIcon={Photo}
          component="span"
        >
          Upload
        </Button>
      </label>
      {error && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      {loading && <HourglassEmpty />}
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ProfileImageUpload