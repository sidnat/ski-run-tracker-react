import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom'
import SignIn from './SignIn';
import Register from './Register'
import { useEffect, useMemo } from 'react';

const UserGuard = (props) => {
  const location = useLocation();
  let navigate = useNavigate()
  const [cookies, ] = useCookies(['token']);
  const notLoggedInPaths = {
    "/": {
      path: "/",
      component: <SignIn />
    },
    "/register": {
      path: "/register",
      component: <Register />
    }
  }

  const checkIsInNotLoggedInPath = () => {
    return notLoggedInPaths[location.pathname]
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const notLoggedInPath = useMemo(() => checkIsInNotLoggedInPath(), [location.pathname])

  useEffect(() => {
    if (cookies.token && notLoggedInPath) {
      navigate('/map');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.token, notLoggedInPath])

  if (cookies.token) {
    return props.children;
  } else {
    const path = notLoggedInPath;
    if (path) {
      return path.component
    }
    else {
      navigate('/');
    }
  }
}


export default UserGuard;