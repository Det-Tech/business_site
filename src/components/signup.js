import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from 'notistack';
import MyMap from "./myMap";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customerSignUp, businessSignUp } from "../actions/userActions";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Signup = (props) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newObject = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      location: localStorage.getItem('cityinfo')
    };
    data.get("isBusiness") != null
      ? await props.businessSignUp(newObject).then(res => {
        if (res.status === 409) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 400) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 500) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 201) {
          enqueueSnackbar("Successfully Created", { variant: 'success', autoHideDuration: 1000 })
          setTimeout(() => {
            navigate('/');
          }, 2000)
        }

      })
      : await props.customerSignUp(newObject).then(res => {
        if (res.status === 409) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 400) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 500) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 201) {
          enqueueSnackbar("Successfully Created", { variant: 'success', autoHideDuration: 1000 })
          setTimeout(() => {
            navigate('/');
          }, 2000)
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <div style={{ width: '100%', marginTop: '20px', marginLeft: '15px' }}>
                <MyMap />
              </div>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="isBusiness" color="primary" />}
                  label="Are you a Business?"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

Signup.propTypes = {
  customerSignUp: PropTypes.func.isRequired,
  businessSignUp: PropTypes.func.isRequired,
}

export default connect(null, { customerSignUp, businessSignUp })(Signup);