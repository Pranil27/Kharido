import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route,Navigate, Routes } from 'react-router-dom';
import Profile from '../User/Profile';

const ProtectedRoute = ({element:Component}) => {
    const {loading,isAuthenticated,user} = useSelector((state)=>state.user);

  return (
    <Fragment>
        {!loading && (
            <Fragment>
                {isAuthenticated ?<Component />:<Navigate to="/login"/>}
                
            </Fragment>

        
        )}
    </Fragment>
    
  )
}

export default ProtectedRoute