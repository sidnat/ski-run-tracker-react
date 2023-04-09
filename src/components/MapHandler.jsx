import { useCallback, useState } from "react";
import { useMapEvent } from "react-leaflet/hooks";
import { Polyline } from "react-leaflet";
import blueMountain from '../assets/mapData/blue-mountain.json'
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  updateRunCount,
  selectTrails
} from '../features/trailsSlice';
import TrailDialog from "./TrailDialog";
import ConfirmDialog from "./ConfirmDialog";
// import { selectUser } from "../features/userSlice";
import instance from "../utils/axios";
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode";
import moment from "moment";

const MapHandler = () => {
  const mountainTrails = useSelector(selectTrails)
  const mountainName = mountainTrails.name
  // const isLoggedIn = useSelector(selectUser)
  const dispatch = useDispatch();
  const [clickedTrailName, setClickedTrailName] = useState('');
  const [trailDialogOpen, setTrailDialogOpen] = useState('');
  const [cookies, ] = useCookies(['token']);
  const decoded = jwt_decode(cookies.token);

  //used to create a trail polyline
  const onDoubleClick = useCallback(
    (e) => {
      console.log([e.latlng.lat, e.latlng.lng])
    },
    []
  );

  const setTrailCompleted = (trailName) => {
    const run = {
      userID: decoded.id,
      mountainName,
      trailName,
      runCounter: 1,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    instance.post('addRun', run)
      .then(res => {
        dispatch(increment(trailName))
        setClickedTrailName('')
      })
      .catch(err => {
        console.log(err);
      })
  }

  const setTrailIncomplete = (trailName) => {
    const run = {
      userID: decoded.id,
      mountainName,
      trailName,
    }

    instance.post('deleteRun', run)
      .then(res => {
        dispatch(updateRunCount({ name: trailName, value: 0 }))
        setTrailDialogOpen('')
      })
      .catch(err => {
        console.log(err);
      })
  }

  const updateTrailRunCount = (trailName, newCount) => {
    console.log('update run', newCount)
    const run = {
      userID: decoded.id,
      mountainName,
      trailName,
      runCounter: newCount
    }

    instance.post('updateRun', run)
      .then(res => {
        dispatch(updateRunCount({ name: trailName, value: newCount }))
        setTrailDialogOpen('')
      })
      .catch(err => {
        console.log(err);
      })
  }

  useMapEvent("click", onDoubleClick);

  return (
    <>
      {Object.values(blueMountain.trails).map((trail, id) => {
        // console.log('name', trail.name)        
        // console.log('obj', Object.values(blueMountain.trails))
        // console.log('state', blueMountainTrails)
        // console.log('bm', blueMountainTrails.trails[trail.name])
        // console.log('trail', trail)

        return (
          <>
            <Polyline
              key={id}
              positions={trail.positions}
              pathOptions={{
                color: 'purple',
                weight: 15,
                opacity: mountainTrails.trails[trail.name].runCounter > 0 ? 0.5 : 0
              }}
              eventHandlers={{
                click: () => {
                  console.log(trail)
                  if (mountainTrails.trails[trail.name].runCounter === 0) {
                    setClickedTrailName(trail.name)
                  }

                  if (mountainTrails.trails[trail.name].runCounter > 0) {
                    setTrailDialogOpen(trail.name);
                  }
                },
              }}
            />
            <ConfirmDialog
              clickedTrailName={trail.name === clickedTrailName}
              setClickedTrailName={setClickedTrailName}
              setTrailCompleted={setTrailCompleted}
              trail={trail}
            />
            <TrailDialog
              trailDialogOpen={trail.name === trailDialogOpen}
              setTrailDialogOpen={setTrailDialogOpen}
              setTrailIncomplete={setTrailIncomplete}
              updateTrailRunCount={updateTrailRunCount}
              trail={trail}
              mountainTrails={mountainTrails}
            />
          </>
        )
      }
      )}
    </>
  )
}

export default MapHandler
