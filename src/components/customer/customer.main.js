import * as React from "react";
import MyCalendar from "../initCalendar"
import Menubar from "../menubar"
import { getCustomerAppointment, updateCustomerAppointment, deleteAppointment, setBusinessEmail } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

const usePrevious = (value) => {
  const ref = React.useRef()
  React.useEffect(()=>{
    ref.current = value;
  }, [value]);
  return ref.current
}

const Customer = (props) => {
  const dispatch = useDispatch();
  const [appointmentArray, setAppointmentArray] = React.useState([]);
  const customerAppointment = useSelector((state) => state.UserReducerState.customerAppointment)
  let isMounted = true;
  const prevCount = usePrevious(customerAppointment);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(async()=>{
    await dispatch(getCustomerAppointment(JSON.parse(localStorage.getItem('userInfo')).dataValues.id));
    dispatch(setBusinessEmail(""));
  },[])

  React.useEffect(()=>{
    
    if(customerAppointment != prevCount && isMounted) 
    {
      setAppointmentArray(customerAppointment);
    }
    return () => {isMounted = false;}
  }, [customerAppointment]);

  const addFunc = () => {
    navigate('/add_appointment');
  }

  const postCommitChange = async(title, params) => {
    if(title === 'delete'){
      const result = await dispatch(deleteAppointment(params.id));
      if(result.status === 400 ) {enqueueSnackbar(result.data, {variant: 'warning', autoHideDuration: 1000})}
      if(result.status === 200 ) enqueueSnackbar("Successfully Deleted", {variant: 'success', autoHideDuration: 1000})
    }
    if(title === 'save'){
      var temp = customerAppointment.some((value) => {
        if(params.id !==  value.id){
        var arrayStartTime = new Date(value.startDate).toISOString()
        var arrayEndTime = new Date(value.endDate).toISOString()
        var itemStartTime = params.startDate.toISOString()
        var itemEndTime = params.endDate.toISOString()
        
        if((itemStartTime >= arrayStartTime) && (itemStartTime < arrayEndTime) ||
          !(itemEndTime <= arrayStartTime) && !(itemEndTime > arrayEndTime)){
          enqueueSnackbar("Time Error", {variant: 'warning', autoHideDuration: 1000})
          return true;
        }
      }
      
      
    })
    if(temp === true) {
      setTimeout(async() => {
        const result = await dispatch(getCustomerAppointment(JSON.parse(localStorage.getItem('userInfo')).dataValues.id));
        setAppointmentArray(result);
      },1000)
      return false;
    }
    else{
      const newObject={
        id:params.id,
        title: params.title,
        starttime: params.startDate,
        endtime: params.endDate,
        location: localStorage.getItem('cityinfo'),
      }
      const result = await dispatch(updateCustomerAppointment(newObject));
      
      if(result.status === 400 ) enqueueSnackbar(result.data, {variant: 'warning', autoHideDuration: 1000})
      if(result.status === 200 ) {
        enqueueSnackbar("Successfully Saved", {variant: 'success', autoHideDuration: 1000})
        return true;
       }
    }
    
   }
  }

  return (
    <div>
      <Menubar/>
      {appointmentArray.length > 0 && 
      <div style={{marginTop:'8%'}}>
        <MyCalendar data={appointmentArray} addFunc={addFunc} postCommitChange={postCommitChange}/>
      </div>
      } 
    </div>
  );
};

export default Customer;
