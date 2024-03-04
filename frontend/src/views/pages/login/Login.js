import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormCheck
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { cilLockLocked, cilUser, cilEnvelopeClosed, cilCalendar, cilPhone } from '@coreui/icons'
import { Formik,ErrorMessage } from 'formik'
import { updateAccessToken,updateLoggedUserDetails } from 'src/redux/slices/commonSlice'
import { useDispatch } from 'react-redux'
import * as Yup from "yup"
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
})

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is a required field"),
  lastName: Yup.string()
    .required("Last Name is a required field"),
  dob: Yup.date()
    .required("DOB is a required field"),
  phoneNumber: Yup.string()
    .required("Phone Number is a required field"),  
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [loginErr, setLoginErr] = useState('');
  const signupSubmit = async (values) => {
    alert('hii');
    const url = process.env.REACT_APP_API_BASE_URL;
    let data = values;
    data.role = "user";
    data.gender = "female";
    axios.post(url+"/api/users", data)
    .then(async response => {
      console.log('Request successful:', response.data);
      if(response.data.status) {
        await Toast.fire({
          icon: 'success',
          title: "Account created successfully",
        })
        setIsLoginPage(true);
      } else {
        await Toast.fire({
          icon: 'failed',
          title: response.data.message,
        })
      }
      
    })
    .catch(async error => {
      console.error('Request failed:', error);
      await Toast.fire({
        icon: 'failed',
        title: error.message,
      })
    });
  }
  const submitLogin = async (values) => {
    const url = process.env.REACT_APP_API_BASE_URL;
    let data = {
      email: values.email,
      password: values.password
    };
    axios.post(url+"/api/login", data)
    .then(async response => {
      console.log('Request successful:', response.data);
      if(response.data.status) {
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("userId", response.data.user._id);
        dispatch(updateAccessToken(response.data.access));
        dispatch(updateLoggedUserDetails(response.data.user));
        navigate('/dashboard');
      } 
      await Toast.fire({
        icon: 'failed',
        title: response.data.message,
      })
    })
    .catch(async error => {
      console.error('Request failed:', error);
      await Toast.fire({
        icon: 'failed',
        title: error.message,
      })
    });
  }
  const switchPage = () => {
    setIsLoginPage(!isLoginPage);
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          {
            isLoginPage ?
            <CCol md={8}>
              <CCardGroup style={{ justifyContent: 'center' }}>
              <Formik
                validationSchema={schema}
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                  submitLogin(values);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <CCard className="p-4">
                    <CCardBody>
                        <>
                        <h1>Login</h1>
                        <p className="text-medium-emphasis">Sign In to your account</p>
                        <p style={{ color: 'red' }}>{loginErr}</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <CFormInput placeholder="Email ID" name='email' id='email' autoComplete="username" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                        </CInputGroup>
                        <ErrorMessage name="email" component="p" style={{ color : 'red' }} />
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Password"
                            name='password'
                            id='password'
                            autoComplete="current-password"
                          />
                          
                          {/* <p className='error'>{errors.password && touched.password && errors.password}</p> */}
                        </CInputGroup>
                        <ErrorMessage name="password" component="p" style={{ color : 'red' }} />
                        <CRow>
                          <CCol xs={6}>
                            <CButton type='submit' color="primary" className="px-4">
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0" onClick={switchPage}>
                              Create Account
                            </CButton>
                          </CCol>
                        </CRow>
                        
                        </>
                      
                    </CCardBody>
                  </CCard>
                  
                </form>
                
                )}
                </Formik>
              </CCardGroup>
          </CCol>
          :
          <CCol md={8}>
            <CCardGroup style={{ display:'block' }}>
            <Formik
              validationSchema={signupSchema}
              initialValues={{ email: "", password: "", dob: "", firstName: "", lastName: "", phoneNumber : ""  }}
              onSubmit={(values, { resetForm }) => {
                console.log('sssss');
                signupSubmit(values);
                resetForm();
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
              <form noValidate onSubmit={handleSubmit}>
                <CCard className="p-4">
                  <CCardBody>
                      <>
                      <h1>Signup</h1>
                      <p className="text-medium-emphasis">Create your account</p>
                      <p style={{ color: 'red' }}>{loginErr}</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="First Name" name='firstName' id='firstName'  onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
                        {/* <p className='error'>{errors.email && touched.email && errors.email}</p> */}
                        
                      </CInputGroup>
                      <ErrorMessage name="firstName" component="p" style={{ color : 'red' }} />  
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Last Name" name='lastName' id='lastName'  onChange={handleChange} onBlur={handleBlur} value={values.lastName} />
                        {/* <p className='error'>{errors.email && touched.email && errors.email}</p> */}
                        
                      </CInputGroup>
                      <ErrorMessage name="lastName" component="p" style={{ color : 'red' }} />  
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilEnvelopeClosed } />
                        </CInputGroupText>
                        <CFormInput placeholder="Email ID" name='email' id='email'  onChange={handleChange} onBlur={handleBlur} value={values.email} />
                        {/* <p className='error'>{errors.email && touched.email && errors.email}</p> */}
                         
                      </CInputGroup>
                      <ErrorMessage name="email" component="p" style={{ color : 'red' }} />

                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilPhone } />
                        </CInputGroupText>
                        <CFormInput placeholder="Phone Number" name='phoneNumber' id='phoneNumber'  onChange={handleChange} onBlur={handleBlur} value={values.phoneNumber} />
                        {/* <p className='error'>{errors.email && touched.email && errors.email}</p> */}
                         
                      </CInputGroup>
                      <ErrorMessage name="phoneNumber" component="p" style={{ color : 'red' }} /> 
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Password"
                          name='password'
                          id='password'
                          autoComplete="current-password"
                        />
                        {/* <p className='error'>{errors.password && touched.password && errors.password}</p> */}
                        
                        
                      </CInputGroup>
                      <ErrorMessage name="password" component="p" style={{ color : 'red' }} />
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilCalendar} />
                        </CInputGroupText>
                        <CFormInput placeholder="Date of birth" name='dob' id='dob' type='date' onChange={handleChange} onBlur={handleBlur} value={values.dob} />

                        {/* <p className='error'>{errors.email && touched.email && errors.email}</p> */}
                        
                      </CInputGroup>
                      <ErrorMessage name="dob" component="p" style={{ color : 'red' }} /> 

                      <CRow>
                        <CCol xs={6}>
                          <CButton type='submit' color="primary" className="px-4">
                            Signup
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0" onClick={switchPage}>
                            Login!
                          </CButton>
                        </CCol>
                      </CRow>
                      
                      </>
                    
                  </CCardBody>
                </CCard>
                
              </form>
              
              )}
              </Formik>
            </CCardGroup>
          </CCol>
          }
          
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
