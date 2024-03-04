import React, { useState, useEffect } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { RadioButton } from 'primereact/radiobutton'
import { Dialog } from 'primereact/dialog'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { storeSelectedUser } from 'src/redux/slices/commonSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userData } from 'src/utills/data'
import CustomFetch from 'src/utills/axiosCustomFetch'
import moment from 'moment'

const Dashboard = () => {
  const customAxios = CustomFetch()
  const [users, setUsers] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [displayModal, setDisplayModal] = useState(false)
  const [editUser, setEditUser] = useState(false)
  const [genter, setGender] = useState('')
  const [address, setAddress] = useState([
    { street: '', city: '', postalCode: '', country: '', state: '' },
  ])
  const router = useNavigate()
  const dispatch = useDispatch()
  const baseUrl = process.env.REACT_APP_BASE_URL

  const { selectUser } = useSelector((state) => state.common);
  const addAddress = () => {
    setAddress([...address, { street: '', city: '', postalCode: '', country: '', state: '' }])
  }

  const editUserHandle = (rowData) => {
    setDisplayModal(true)
    setEditUser(true)
    setSelectedUser(rowData)
    setAddress(rowData?.address)
    dispatch(storeSelectedUser(rowData))
  }

  const hideModal = () => {
    setDisplayModal(false)
    setEditUser(false)
  }

  const deleteAddress = (index) => {
    const updatedAddresses = [...address]
    updatedAddresses.splice(index, 1)
    setAddress(updatedAddresses)
  }

  const deleteIconColumn = (rowData) => {
    console.log('reoData', rowData)
    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <button className="option_btn" onClick={() => handleUser(rowData, 'view-user')}>
          View
        </button>
        <button className="option_btn" onClick={() => editUserHandle(rowData)}>
          Edit
        </button>
      </div>
    )
  }

  const handleUser = (data, route) => {
    dispatch(storeSelectedUser(data))
    router(`/${route}`)
    console.log('data', data)
  }

  console.log('Selecteduser', selectedUser)

  useEffect(() => {
    getUsersList();
  }, [])

  const getUsersList = () => {
    customAxios.get('/api/users').then((response) => {
      setUsers(response.data?.data)
      console.log('Addre', response?.data?.data?.address)
    })
  }
  const handleAddressValueChange = (e, index, type) => {
    setAddress(prevAddress => {
      let updatedAddress = [...prevAddress];
      if (type === 'street') {
        updatedAddress[index].street = e.target.value;
      } else if (type === 'city') {
        updatedAddress[index].city = e.target.value;
      } else if (type === 'state') {
        updatedAddress[index].state = e.target.value;
      } else if (type === 'country') {
        updatedAddress[index].country = e.target.value;
      } else if (type === 'postalcode') {
        updatedAddress[index].postalCode = e.target.value;
      }
      return updatedAddress;
    });
  };
  return (
    <>
      <div className="card user_manage_header">
        <Card className="flex justify-content-between align-items-center user_manage_header">
          <h4 className="m-0">User Management</h4>
          <div className="position-relative add_button">
            <Button
              className="border-0 flex justify-content-center align-items-center position-relative gap-2 add_user_button"
              type="button"
              label="Add User"
              onClick={() => setDisplayModal(true)}
              // size="small"
            />
            <i
              className="position-absolute plus_icon"
              style={{ cursor: 'pointer' }}
              onClick={() => setDisplayModal(true)}
            ></i>
          </div>
        </Card>
      </div>

      <div>
        <div className="card userTableListContainer">
          <DataTable
            value={users}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
            className="userTableList"
            size="small"
            selection={selectedUser}
            onSelectionChange={(e) => setSelectedUser(e.value)}
          >
            <Column field="_id" header="Id" sortable style={{ width: '5%' }}></Column>
            <Column field="firstName" header="FirstName" sortable style={{ width: '10%' }}></Column>
            <Column field="lastName" header="LastName" sortable style={{ width: '10%' }}></Column>
            <Column field="email" header="Email" sortable style={{ width: '12%' }}></Column>
            <Column field="phoneNumber" header="PhoneNo" sortable style={{ width: '12%' }}></Column>
            <Column field="dob" header="DOB" sortable style={{ width: '12%' }}></Column>
            <Column header="Actions" body={deleteIconColumn} style={{ width: '12%' }}></Column>
          </DataTable>
        </div>
        <Dialog visible={displayModal} onHide={hideModal}>
          <Formik
            initialValues={{
              firstName: selectedUser ? selectedUser.firstName : '',
              lastName: selectedUser ? selectedUser.lastName : '',
              email: selectedUser ? selectedUser.email : '',
              phoneNumber: selectedUser ? selectedUser.phoneNumber : '',
              dob: selectedUser ? selectedUser.dob : '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required('Required'),
              lastName: Yup.string().required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              phoneNumber: Yup.string().required('Required'),
              dob: Yup.date().max(new Date(), 'Date of birth must be in the past').nullable(),
            })}
            onSubmit={(values) => {
              
             if(editUser) {
                values.id = selectUser.id;
                values.address = address;
                alert(JSON.stringify(values));
                customAxios
                  .put('/api/users', values)
                  .then((response) => {
                    // Handle successful post request
                    console.log('Post request successful')
                    console.log(response.data) // Response data from the server
                    hideModal() // Close the modal after successful post
                    // getUsersList();
                    const newUpdate = [...users];
                    const indexById = newUpdate.findIndex(item => item.id === values.id);
                    newUpdate[indexById] = { ...newUpdate[indexById], ...values };
                    setUsers(newUpdate);
                    
                  })
                  .catch((error) => {
                    // Handle error
                    console.error('Error posting data:', error)
                    // Optionally, you can handle errors by displaying an error message to the user
                  })
             } else {
              console.log('values', values);
              values.address = address;
              alert(JSON.stringify(values));
              customAxios
                .post('/api/users', values)
                .then((response) => {
                  // Handle successful post request
                  console.log('Post request successful')
                  console.log(response.data) // Response data from the server
                  hideModal() // Close the modal after successful post
                  const newUpdate = [...users];
                  newUpdate.unshift(values);
                  setUsers(newUpdate)
                })
                .catch((error) => {
                  // Handle error
                  console.error('Error posting data:', error)
                  // Optionally, you can handle errors by displaying an error message to the user
                })
             }
                
             
             
            }}
          >
            {({ isSubmitting, setFieldValue  }) => (
              <Form>
                {editUser ? (
                  <h5 className="pb-4">Update User</h5>
                ) : (
                  <h5 className="pb-4">New User</h5>
                )}
                <div className="flexBox">
                  <Field type="text" name="firstName" placeholder="firstName" as={InputText} />
                  <ErrorMessage name="firstName" component="div" className="error" />
                  <Field type="text" name="lastName" placeholder="lastName" as={InputText} />
                  <ErrorMessage name="lastName" component="div" className="error" />
                </div>
                <div className="flexBox">
                  <Field type="email" name="email" placeholder="Email" as={InputText} />
                  <ErrorMessage name="email" component="div" className="error" />
                  <Field type="text" name="phoneNumber" placeholder="phoneNumber" as={InputText} />
                  <ErrorMessage name="phoneNumber" component="div" className="error" />
                </div>
                
                <div className="flexBox">
                  <Field
                    type="date"
                    name="dob"
                    placeholder="DOB"
                    as={Calendar}
                    value={selectedUser ? new Date(selectedUser.dob) : null}
                    dateFormat="mm/dd/yy"
                    onChange={(e) => {
                      // Convert the selected date to the appropriate format and set it in Formik state
                      setFieldValue('dob', moment(e.value).format('YYYY-MM-DD'))
                    }}
                  />
                  <ErrorMessage name="dob" component="div" className="error" />
                 
                </div>
                {
                  !editUser &&
                  <div className="flexBox">
                    <Field type="password" name="password" placeholder="Password" as={InputText} />
                    <ErrorMessage name="password" component="div" className="error" />
                  </div>
                }
                
                <Button type="submit" label="Save" />
              </Form>
            )}
          </Formik>
        </Dialog>
      </div>
    </>
  )
}

export default Dashboard
