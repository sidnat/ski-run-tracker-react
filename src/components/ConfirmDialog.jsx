import {
  Button,
  // TextField,
  Dialog,
  // DialogActions,
  // DialogContent,
  // Select,
  // MenuItem,
  Typography,
  Grid,
  // Card,
  // InputLabel,
  // FormControl
} from "@mui/material";

const ConfirmDialog = (props) => {
  const {
    clickedTrailName,
    setClickedTrailName,
    setTrailCompleted,
    trail
  } = props

  return (
    <Dialog open={clickedTrailName} onClose={() => setClickedTrailName(false)}>
      <Grid m={2} justifyContent="center" alignItems="center">
        <Typography variant="h4" align="center">
          {trail.name}
        </Typography>
        <Typography variant="h4" align="center">
          {trail.difficulty}
        </Typography>
      </Grid>
      <Button onClick={() => setTrailCompleted(trail.name)}>
        Completed
      </Button>
    </Dialog>
  );
};

export default ConfirmDialog;
