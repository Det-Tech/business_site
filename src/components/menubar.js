import React, { useEffect, useState } from 'react';
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBusinessInfoArray } from "../actions/userActions";
import { useSnackbar } from 'notistack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Menubar = (props) => {
  const [userInfo, setUserInfo] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(async () => {
    const res = await props.getBusinessInfoArray();
    if (res.status === 403 || res.status === 401) enqueueSnackbar(res.data, { variant: 'warning', autoHideDuration: 1000 })
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")).dataValues.name)
  }, []);

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cityinfo');
    navigate('/');
  }

  return (
    <MuiAppBar position="fixed">

      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        {userInfo !== '' && <Avatar {...stringAvatar(userInfo)} />}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, marginLeft: '20px' }}

        >
          {userInfo}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={logout} color="inherit" sx={{ marginX: '1rem' }}>
          <Badge color="secondary">
            <LogoutIcon />
          </Badge>
        </IconButton>

      </Toolbar>
    </MuiAppBar>
  )
}

Menubar.propTypes = {
  getBusinessInfoArray: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  userInfo: state.UserReducerState.userInfo,
})

export default connect(mapStateToProps, { getBusinessInfoArray })(Menubar);
