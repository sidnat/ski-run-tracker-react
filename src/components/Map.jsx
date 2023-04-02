import skiMap from '../assets/blue-mountain-ski-trails.png'
import MapHandler from './MapHandler'
import "./styles.css";
import { MapContainer, ImageOverlay } from "react-leaflet";
// import MapComponent from "./MapComponent";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import instance from '../utils/axios'
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  isCompleted,
  selectTrails
} from '../features/trailsSlice';
import { selectUser } from "../features/userSlice";

const M = ({ width, height, zoom, center }) => {
  const hw = [height, width];
  const origin = [0, 0];
  const bounds = [origin, hw];
  const dispatch = useDispatch()

  //useeffect to get all runs for user id
  // instance.get('getRuns', (req, res) => {
  //axios call to get all run data from db for user id, store in redux
  // have loading screen
  // .then render mapContariner
  // })


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
  const isLoggedIn = useSelector(selectUser)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <M width={1920} height={950} center={[0, 0]} />
    </div>
  );
}

export default Map