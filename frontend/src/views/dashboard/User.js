import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function User() {
  const [displayModal, setDisplayModal] = useState(false);
  const { selectUser } = useSelector((state) => state.common);

  const showAddresses = () => {
    setDisplayModal(true);
  };

  const hideModal = () => {
    setDisplayModal(false);
  };

  const handleUser = (rowData) => {

  }
  const deleteIconColumn = (rowData) => {
    console.log('rowData', rowData);
    return (
      <div style={{ display: 'flex', gap: '20px' }}>
        <button className="option_btn" onClick={() => handleUser(rowData)}>
          Delete
        </button>
      </div>
    );
  };

  return (
    <div>
      <Card className="position-relative">
        <div className="position-absolute user_profile_header">
          <h4>
            {selectUser?.firstName}
            {selectUser?.lastName}{' '}
          </h4>
          <h6>{selectUser?.email}</h6>
          <div className="flex flex-wrap gap-8">
            <h5>{selectUser?.phoneNo}</h5>
            <h5>{selectUser?.dob}</h5>
            <h5>{selectUser?.gender}</h5>
          </div>
        </div>

        <img className="userIcon" src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png" alt="userIcon" />
      </Card>

      <div>
        <div className="card userTableListContainer">
          {/* <div className="position-relative add_button flex justify-content-end ml-auto">
            <Button
              className="border-0 flex justify-content-center align-items-center position-relative gap-2 add_user_button"
              type="button"
              label="Add Address"
              onClick={showAddresses}
              // size="small"
            />
            <i className="position-absolute plus_icon" style={{ cursor: 'pointer' }} onClick={showAddresses}></i>
          </div> */}
          <DataTable
            value={selectUser.address}
            // paginator
            // rows={5}
            // rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: '50rem' }}
            className="userTableList mt-5"
            size="small"
          >
            <Column field="id" header="S.No" sortable style={{ width: '5%' }}></Column>
            <Column field="street" header="St.Address" sortable style={{ width: '10%' }}></Column>
            <Column field="city" header="City" sortable style={{ width: '10%' }}></Column>
            <Column field="state" header="State" sortable style={{ width: '12%' }}></Column>
            <Column field="postalCode" header="Postal Code" sortable style={{ width: '12%' }}></Column>
            <Column field="country" header="Country" sortable style={{ width: '12%' }}></Column>
            {/* <Column header="Actions" body={deleteIconColumn} style={{ width: '12%' }}></Column> */}
          </DataTable>
        </div>
      </div>

      {/* <Dialog visible={displayModal} onHide={hideModal}>
        <Formik
          initialValues={{
            streetAddress: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
          }}
          validationSchema={Yup.object({
            streetAddress: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            postalCode: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
          })}
          onSubmit={(values) => {
            // Save logic here
            console.log(values);
            hideModal();
          }}
        >
          <Form>
            <h5 className="pb-4">New Address</h5>
            <div className="flexBox">
              <Field type="text" name="streetAddress" placeholder="St.Address" as={InputText} />
              <ErrorMessage name="streetAddress" component="div" className="error" />
              <Field type="text" name="city" placeholder="City" as={InputText} />
              <ErrorMessage name="city" component="div" className="error" />
            </div>
            <div className="flexBox">
              <Field type="text" name="state" placeholder="State" as={InputText} />
              <ErrorMessage name="state" component="div" className="error" />
              <Field type="text" name="postalCode" placeholder="Postal Code" as={InputText} />
              <ErrorMessage name="postalCode" component="div" className="error" />
            </div>
            <div className="flexBox">
              <Field type="text" name="country" placeholder="Country" as={InputText} />
              <ErrorMessage name="country" component="div" className="error" />
            </div>
            <Button type="submit" label="Save" />
          </Form>
        </Formik>
      </Dialog> */}
    </div>
  );
}

export default User;