import * as React from 'react'
import Menubar from "../menubar"
import { getBusinessAppointmentById } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import MyCalendar from './calendar';
import { removeAppointment, changeAppointment } from '../../actions/userActions';
import Information from './information';

const usePrevious = (value) => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current
}

const Business = (props) => {

  const dispatch = useDispatch();
  const [appointmentArray, setAppointmentArray] = React.useState([]);
  const businessAppointment = useSelector((state) => state.UserReducerState.businessAppointment)
  let isMounted = true;
  const prevCount = usePrevious(businessAppointment);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(async () => {
    const id = JSON.parse(localStorage.getItem('userInfo')).dataValues.id;
    await dispatch(getBusinessAppointmentById(id));
  }, []);

  React.useEffect(() => {

    if (businessAppointment != prevCount && isMounted) {
      setAppointmentArray(businessAppointment);
    }
    return () => { isMounted = false; }
  }, [businessAppointment]);

  const postCommitChange = async (value, param) => {
    if (value === 'delete') {
      await dispatch(removeAppointment(param.id));
    }
    if (value === 'save') {
      await dispatch(changeAppointment(param.id));
    }
    window.location = '/business';
  }

  return (
    <div style={{ display: 'flex', flexFlow: 'row' }}>
      <Menubar />
      {appointmentArray.length > 0 &&
        <div style={{ marginTop: '8%', width: '70%' }}>
          <MyCalendar data={appointmentArray} postCommitChange={postCommitChange} />
        </div>
      }
      <div style={{ marginTop: '8%' }}>
        <Information />
      </div>
    </div>
  )
}

export default Business;
