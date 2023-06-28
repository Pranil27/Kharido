import React, { Fragment, useEffect, useState } from 'react'
import "./UpdateProfile.css"
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import  MailOutlineIcon  from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,loadUser,login, updateProfile} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {  ReactLocation, Router } from 'react-location'
import MetaData from "../layout/MetaData.js";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';



const UpdateProfile = () => {
    const location=new ReactLocation();
    const history=useNavigate();
    const dispatch= useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state) => state.user);
    const {error,isUpdated,loading} = useSelector((state)=>state.profile);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        // myForm.set("password",password);
        myForm.set("avatar",avatar);

       dispatch(updateProfile(myForm));
    }


    const updateProfileDataChange = (e) => {

                const reader = new FileReader();
          
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                  }
                };
          
                reader.readAsDataURL(e.target.files[0]);
    }

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(()=> {
        if(user){
          setName(user.name);
          setEmail(user.email);
          setAvatarPreview(user.avatar.url);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        if(isUpdated){
          alert.success("Profile Updated Successfully");
          dispatch(loadUser());
          history("/account");

          dispatch({
            type:UPDATE_PROFILE_RESET,
          });
            
        }
         
    },[dispatch , error , alert ,history, user, isUpdated]);


  return <Fragment>
    {loading?<Loader/>:(
      <Fragment>
      <MetaData title="Update Profile"/>
      <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
        <h2 className='updateProfileHeading'>Update Profile</h2>
        <form   className='updateProfileForm'
                encType='multipart/form-data'
                onSubmit={updateProfileSubmit}
                >
                              <div className='updateProfileName'>
                                  <FaceIcon/>
                                  <input 
                                      type='text'
                                      placeholder='Name'
                                      required
                                      name='name'
                                      value={name}
                                      onChange={updateProfileDataChange}
                                  />
  
                              </div>
                              <div className='updateProfileEmail'>
                                  <MailOutlineIcon/>
                                  <input
                                     type='email'
                                     placeholder='Email'
                                     required
                                     name='email'
                                     value={email}
                                     onChange={updateProfileDataChange}
                                  />
                                  
                              </div>
  
                              <div id='updateProfileImage'>
                                  <img src={avatarPreview} alt='Avatar Preview'/>
                                  <input type='file'
                                         name='avatar'
                                         accept=""
                                         onChange={updateProfileDataChange}
                                  />
                              </div>
                              <input type='submit' value="updateProfile" className='updateProfileBtn'
                                      
                              />
                          </form>
        </div>
      </div>
    </Fragment>
    )}
  </Fragment>
}

export default UpdateProfile