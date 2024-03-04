import React, { Component, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateAccessToken } from './redux/slices/commonSlice'
import './scss/style.scss'
import axios from 'axios'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedUserDetail } = useSelector((state) => state.common);
  const getRefreshToken = () => {
    if(localStorage.getItem('refreshToken') !== null) {
      let refreshToken = localStorage.getItem('refreshToken');
      let userId = localStorage.getItem('userId');
      const url = process.env.REACT_APP_API_BASE_URL;
      let data = {
        id: userId,
        token: refreshToken
      };
      axios.post(url+"/api/refreshToken", data)
      .then(response => {
        console.log('Request successful:', response.data);
        if(response.data.status) {
          dispatch(updateAccessToken(response.data.access));
        } else {
          navigate('/login');
        }
        
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
      console.log(refreshToken);
    }
    else {
      navigate('/login');
    }
    
  }
  useEffect(()=>{
    getRefreshToken();
  },[])
  const {accessToken} = useSelector((state) => state.common);
  return (
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/login" name="Login Page" element={accessToken == "" ? <Login /> : <Navigate to="/"/>} />
          <Route exact path="/register" name="Register Page" element={accessToken == "" ? <Register /> : <Navigate to="/"/>} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
          {/* <Route path="*" name="Home" element={accessToken != "" ? <DefaultLayout /> : <Navigate to="/login"/>} /> */}

        </Routes>
      </Suspense>
  )
}

export default App
