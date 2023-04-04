import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import instance from '../utils/axios';
import { useDispatch } from 'react-redux';
import { 
  addToken,
  addUser,
  // isLoggedIn,
  // selectUser
} from '../features/userSlice';
import { useCookies } from 'react-cookie';

const theme = createTheme();

const SignIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [, setCookie] = useCookies(['token']);
  // const isLoggedIn = useSelector(selectUser)
  const dispatch = useDispatch()

  // useEffect(() => {
  // const token = localStorage.getItem('token');

  //   instance.get("/protected", {
  //     headers: {
  //       // Authorization: token,
  //       Authorization: cookies.token
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     // navigate('/protected')
  //   }).catch(err => {
  //     console.log(err);
  //     // navigate('/login')
  //   })
  // }, [])

  // useEffect(() => {
  //   if (cookies.token) {
  //     navigate('/map')
  //   }
  //   console.log(isLoggedIn)
  // }, [])

  const submit = () => {
    console.log('empass', email, password)
    // debugger
    instance.post("/login", { email, password })
      .then(res => {
        console.log('res', res);
        setCookie('token', res.data.token, { path: '/' });
        console.log('islogged')
        dispatch(addUser(res.data))
        dispatch(addToken(res.data.token))
        navigate('/map')
        // localStorage.setItem('token', user.data.token)
        // navigate('/protected')
      })
      .catch(err => {
        console.log(err);
      })
  }

  // const handleSubmit = () => {
  //   instance.get(`getUser?email=${email}`)
  //     .then((results) => {
  //       // compare bcrypted passwords
  //       // if successful compate then save login to cookies and redux
  //       // redirect to ski map trail page (backend redirect?)
  //     })
  // };
  // .then(res => {
  //   console.log(response.data.data.user.firstName)
  //   dlv(response, 'data.data.user.firstName', "")
  // })

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?ski)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  if (email && password) {
                    submit()
                  }
                }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}


export default SignIn