import React from 'react'
import {useStorage} from '../../contexts/storageContext'
import { Box, makeStyles, Theme } from '@material-ui/core'



const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "40vh",
    width: "100%",
    position: "relative",
    backgroundColor: "#fafafa",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
    "&::after": {
      content: "''",
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      zIndex: 10,
    },
  },
  image: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
    zIndex: 1,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: theme.spacing(2),
    zIndex: 11,
  },
}));

interface Props {
    imagePath?: string;
    children: React.ReactNode;
}

const Hero: React.FC<Props> = ({imagePath="images/site/resize/hero_1000x800.webp", children}) => {
  const classes = useStyles();
  const { downloadFile } = useStorage() as IStorageContext;
  const [heroImage, setHeroImage] = React.useState<string>("");
  

  React.useEffect(() => {
    downloadFile(imagePath).then((res) => {
      setHeroImage(res);
      console.log(res);
    });

    return () => {
      setHeroImage("");
    };
  }, [downloadFile, imagePath]);

  return (
    <div className={classes.root}>
      {heroImage && (
        <img className={classes.image} src={heroImage} alt="hero" />
      )}
      <Box className={classes.box}>
        {children}
      </Box>
    </div>
  );
};

export default Hero