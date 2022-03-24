import React ,{ useEffect, useState } from 'react'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

import { setBusinessEmail, getBusinessAppointment } from '../../actions/userActions';
const AddItem = (props) => {

  const [userArray, setUserArray] = useState([]);
  const dispatch = useDispatch();
  const businessInfoArray = useSelector((state) => state.UserReducerState.businessInfoArray)
  
  useEffect(()=>{
      if(Object.keys(props.users).length > 0) {
          var newArray = [];
          props.users.forEach((item) => {
              newArray.push(item.email)
          });
          setUserArray(newArray);
      }
  },[props]);

  const businessChange = (event) => {
    var businessId = 0;
    businessInfoArray.forEach((value) => {
        if(value.email === event.target.innerHTML) businessId = value.id;
    });
    props.setBusinessEmail(event.target.innerHTML)
    dispatch(getBusinessAppointment(businessId))
  }
  return (
    <div>
        <Box width={'100%'} style={{display:'flex', flexFlow:'column', justifyContent:'center', alignItems:'center'}}>
        <h3 id="unstyled-modal-title">Please Select Business</h3>
        {userArray.length && <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={userArray}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Business" />}
            onInputChange={businessChange}
        />}
        </Box>
    </div>
  )
}

AddItem.propTypes = {
    setBusinessEmail: PropTypes.func.isRequired
} 

const mapStateToProps = state => ({
    users: state.UserReducerState.businessInfoArray,
});

export default connect (mapStateToProps, {setBusinessEmail})(AddItem);