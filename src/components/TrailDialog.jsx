import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  isCompleted,
  selectTrails
} from '../features/trailsSlice';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  InputLabel,
  FormControl
} from "@mui/material";
import instance from '../utils/axios'

const TrailDialog = (props) => {
  const dispatch = useDispatch();
  const {
    trailDialogOpen,
    setTrailDialogOpen,
    trail
  } = props
  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    note: "",
  });

  //pull counter from redux using trail name

  const incomplete = () => {
    //instance.post removeRun
    dispatch(isCompleted(trail.name))
    setTrailDialogOpen('')
  }

  return (
    <Dialog open={trailDialogOpen} onClose={() => setTrailDialogOpen('')}>
      <Grid m={2} justifyContent="center" alignItems="center">
        <Typography variant="h4" align="center">
          {trail.name}
        </Typography>
        <Typography variant="h4" align="center">
          {trail.difficulty}
        </Typography>
      </Grid>
      <Button onClick={() => incomplete()}>
        Not Completed
      </Button>
    </Dialog>
  );
};

export default TrailDialog;
