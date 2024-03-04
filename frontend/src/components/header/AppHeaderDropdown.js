import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import CustomFetch from 'src/utills/axiosCustomFetch'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const customAxios = CustomFetch();
  const navigate = useNavigate();
  const handleLogout = () => {
    let refreshToken = localStorage.getItem('refreshToken');
    let userId = localStorage.getItem('userId');
    let values = {
      id : userId,
      token : refreshToken
    }
    customAxios
      .post('/api/logout', values)
      .then((response) => {
        if(response.data.status === true) {
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        // Handle error
        alert(error);
        // Optionally, you can handle errors by displaying an error message to the user
      })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
