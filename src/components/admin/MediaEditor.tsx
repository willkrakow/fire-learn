import React from 'react'
import { useFirestore, useStorage } from '../../contexts'
import { makeStyles, Theme, CircularProgress, Grid } from '@material-ui/core'
import {UploadResult, getDownloadURL} from 'firebase/storage'
import { useSnackbar } from '../../hooks'   
import { PrimaryButton } from '../buttons'
import { Image } from '@material-ui/icons'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
  },
  fileInput: {
    display: "none",
  },
  imagePreview: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  label: {
    height: "100%",
    width: "100%",
  },
  button: {
    display: "flex",
    flexWrap: 'wrap',
    height: "100%",
    width: "100%",
    textAlign: "center",
    padding: 0,
  }
}));

interface Props {
    documentPath: string;
    currentImage?: string;
    title: string;
}


const MediaEditor: React.FC<Props> = ({documentPath, currentImage, title}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [tempImage, setTempImage] = React.useState<string | null>(null);
  const { SnackbarAlert, setOpen, setMessage, setSeverity } = useSnackbar();
  const { uploadFile } = useStorage() as IStorageContext;
  const { updateDocument } = useFirestore() as IFirestoreContext;

  const classes = useStyles();

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
      setMessage("No file selected")
      setSeverity("warning")
      setOpen(true)
      return; // don't submit
    }
    if (file.size > 5000000) {
      setMessage("File must be less than 5Mb")
      setSeverity("warning")
      setOpen(true)
      return; // don't submit
    }
    // Upload file to Firebase Storage
    const result: UploadResult = await uploadFile({
      file: file,
      path: `${documentPath}/${file.name}`,
    });

    if (!result) {
      setMessage("Error uploading file")
      setSeverity("error")
      setOpen(true)
      return; // don't submit
    }
    // Get the download URL
    const downloadUrl = await getDownloadURL(result.ref);
    // Update the user's profile image with the URL
    await updateDocument({ path: `${documentPath}`, data: {image_url: downloadUrl} })
    setMessage("Image updated")
    setSeverity("success")
    setOpen(true)
    setLoading(false);
    window.location.reload();
  };

  return (
    <Grid container spacing={0} direction="column">
      <Grid
        item
        component="img"
        className={classes.imagePreview}
        src={tempImage || currentImage || "https://source.unsplash.com/random"}
        alt={title}
      />
      <Grid
        item
        component="form"
        onSubmit={handleSubmit}
        className={classes.root}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className={classes.fileInput}
        />
        <label className={classes.label} htmlFor="file-input">
          {!file && (
            <PrimaryButton
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Add media<br /> <Image fontSize="inherit" />
            </PrimaryButton>
          )}
          {file && (
            <PrimaryButton
              className={classes.button}
              variant="contained"
              color="secondary"
              disabled={loading}
              type="submit"
            >
              Upload {loading && <CircularProgress />}
            </PrimaryButton>
          )}
        </label>
      </Grid>
      
      <SnackbarAlert />
    </Grid>
  );
};

export default MediaEditor;
