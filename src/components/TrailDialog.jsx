import { useState } from "react";
import {
  Button,
  TextField,
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

const TrailDialog = (props) => {
  const {
    trailDialogOpen,
    setTrailDialogOpen,
    setTrailIncomplete,
    updateTrailRunCount,
    trail,
    mountainTrails
  } = props
  const [runCounterInput, setRunCounterInput] = useState(null);
  //pull counter from redux using trail name
  const runCounter = mountainTrails.trails[trail.name].runCounter

  return (
    <Dialog open={trailDialogOpen} onClose={() => setTrailDialogOpen('')}>
      <Grid m={2} justifyContent="center" alignItems="center">
        <Typography variant="h4" align="center">
          {trail.name}
        </Typography>
        <Typography variant="h4" align="center">
          {trail.difficulty}
        </Typography>
        <TextField
          id="outlined-basic"
          label={runCounter}
          variant="outlined"
          onChange={(e) => {
            setRunCounterInput(e.target.value)
          }}
        />
      </Grid>
      <Button onClick={() => {
        updateTrailRunCount(trail.name, runCounterInput)
      }}>
        Update
      </Button>
      <Button onClick={() => {
        setTrailIncomplete(trail.name)
      }}>
        Not Completed
      </Button>
    </Dialog>
  );
};

export default TrailDialog;
