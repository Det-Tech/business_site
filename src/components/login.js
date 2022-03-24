import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from 'notistack';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customerLogin, businessLogin } from "../actions/userActions";
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Login = (props) => {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newObject = {
      email: data.get("email"),
      password: data.get("password")
    }
    data.get("isBusiness") != null
      ? await props.businessLogin(newObject).then(res => {
        if (res.status === 400) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 200) {
          enqueueSnackbar("Successfully Login", { variant: 'success', autoHideDuration: 1000 })
          setTimeout(() => {
            navigate('/business');
          }, 2000)
        }

      })
      : await props.customerLogin(newObject).then(res => {
        if (res.status === 400) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
        if (res.status === 200) {
          enqueueSnackbar("Successfully Login", { variant: 'success', autoHideDuration: 1000 })
          setTimeout(() => {
            navigate('/customer');
          }, 2000)
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(./back.jfif)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox name="isBusiness" color="primary" />}
                label="Are you a business?"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
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
};

Login.propTypes = {
  customerLogin: PropTypes.func.isRequired,
  businessLogin: PropTypes.func.isRequired,
}

export default connect(null, { customerLogin, businessLogin })(Login);