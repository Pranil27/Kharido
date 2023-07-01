import React, { Fragment, useState } from 'react'
import "./Header.css"
import { SpeedDial,SpeedDialAction } from '@material-ui/lab'
import Profile from "../../../image/Profile.png"
import { Backdrop } from '@material-ui/core'
import DashboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon  from '@material-ui/icons/ExitToApp'
import ListAltIcon from "@material-ui/icons/ListAlt"
import { useNavigate } from 'react-router-dom';
import { ReactLocation, Router } from 'react-location'
import { useAlert } from 'react-alert'
import {logout} from '../../../actions/userAction'
import { useDispatch } from 'react-redux'
const location = new ReactLocation()


const UserOptions = ({user}) => {
  const history = useNavigate();
  const alert=useAlert();
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    const options = [
      {icon:<ListAltIcon/> , name:"Orders" , func:orders},
      {icon:<PersonIcon/>, name:"Profile" , func:account},
      {icon:<ExitToAppIcon/> , name:"Logout" , func:logoutUser},
    ];

    if(user.role==="admin"){
      options.unshift({icon:<DashboardIcon/> , name:"Dashboard" , func:dashboard});
    }

    function dashboard(){
      history("/dashboard");
    }

    function orders(){
      history("/orders");
    }

    function account(){
      history("/account");
    }

    function logoutUser(){
      dispatch(logout());
      alert.success("Logout successfully");
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
          ariaLabel='SpeedDial tooltip example'
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          className='speedDial'
          style={{zIndex:"11"}}
          open={open}
          direction='down'
          icon={<img
                 className='speedDialIcon'
                 
                 src={(user.avatar && user.avatar.url)? user.avatar.url : Profile}
                alt='Profile'/>}>
           {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
           ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
