import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import AddCalendar from "./calendar";
import Menubar from "../menubar";
import AddItem from './selectBusiness'
import { postAppointments } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

const Addappointment = (props) => {

  const businessAppointment = useSelector((state) => state.UserReducerState.businessAppointment);
  const businessEmail = useSelector((state) => state.UserReducerState.businessEmail);
  const businessInfoArray = useSelector((state) => state.UserReducerState.businessInfoArray)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const addfunc = async (params) => {

    var date = new Date();
    if (params.startDate.toISOString() < date.toISOString()) {
      enqueueSnackbar("Date Error", { variant: 'warning', autoHideDuration: 1000 });
      return false;
    }

    var businessId = 0;
    businessInfoArray.forEach((value) => {
      if (value.email === businessEmail) businessId = value.id;
    });

    const newObject = {
      title: params.title,
      location: params.location,
      starttime: params.startDate.toISOString(),
      endtime: params.endDate.toISOString(),
      location: localStorage.getItem('cityinfo'),
      businessId: businessId,
      customerId: userInfo.dataValues.id,
    }
    const result = await dispatch(postAppointments(newObject));
    if (result.status === 400) {
      enqueueSnackbar(result.data, { variant: 'warning', autoHideDuration: 1000 });
      return false;
    }
    if (result.status === 201) {
      enqueueSnackbar("Successfully Created", { variant: 'success', autoHideDuration: 1000 })
      return true;
    }
  }

  const retFunc = () => {
    navigate('/customer');
  }

  return (
    <div style={{ display: 'flex', flexFlow: 'row' }}>

      <Menubar />
      {console.log(businessEmail)};
      <div style={{ width: '70%', marginTop: '8%' }}>
        {businessEmail &&
          <>
            {
              businessAppointment.length > 0 && <AddCalendar data={businessAppointment}
                addfunc={addfunc}
                retFunc={retFunc}
              />
            }
          </>}
      </div>
      <div style={{ width: '30%', marginTop: '8%' }}>
        <AddItem />
      </div>
    </div>
  );
};

export default Addappointment;
