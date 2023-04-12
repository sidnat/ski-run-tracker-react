import skiMap from '../assets/images/blue-mountain-ski-trails.png'
import { useEffect } from "react";
import MapHandler from './MapHandler'
import Navbar from './Navbar'
import "./styles.css";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector, useDispatch } from 'react-redux';
import {
  updateRunCount,
  selectTrails
} from '../features/trailsSlice';
import { useCookies } from 'react-cookie';
import useGetRuns from '../fetches/useGetRuns';

const M = ({ width, height, zoom, center }) => {
  const hw = [height, width];
  const origin = [0, 0];
  const bounds = [origin, hw];
  const dispatch = useDispatch()
  const getRuns = useGetRuns()

  // const [cookies,] = useCookies(['token']);
  // const mountainTrails = useSelector(selectTrails)
  // const mountainName = mountainTrails.name

  useEffect(() => {
    getRuns
      .then(res => {
        const runsArray = res.data.runs
        // console.log(runsArray)

        runsArray.forEach(run => {
          // console.log(run)
          dispatch(updateRunCount({ name: run.trailName, value: run.runCounter }))
        })
      })
      .catch(err => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //useeffect to get all runs for user id

  // axios call to get all run data from db for user id, store in redux
  // have loading screen
  // .then render mapContariner


  return (
    //map res: 1848 x 904
    //will need logic to adjust image scaling based on different ski maps
    <div style={{ width: "1920px", height: "950px" }}>
      <MapContainer

        bounds={zoom ? undefined : bounds}
        boundsOptions={{
          padding: [0, 0]
        }}
        maxBounds={bounds}
        zoom={center ? zoom : undefined}
        center={zoom ? center : undefined}
        crs={CRS.Simple}
        zoomSnap={0} // Important to disable snap after fitBounds
        whenReady={(e) => e.target.fitBounds(bounds)} // Have the map adjust its view to the same bounds as the Image Overlay
      >
        <ImageOverlay
          url={skiMap}
          bounds={bounds}
          className="map_main"
        />
        <MapHandler />
      </MapContainer>
    </div>
  );
};

const Map = () => {
  // const isLoggedIn = useSelector(selectUser)

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Navbar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <M width={1920} height={950} center={[0, 0]} />
      </div>
    </>
  );
}

export default Map