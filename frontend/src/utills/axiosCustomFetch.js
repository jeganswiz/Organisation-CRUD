import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { updateAccessToken } from "src/redux/slices/commonSlice";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const CustomFetch = () => {
  // Move useSelector inside a functional component
  const { accessToken, loggedUserDetail } = useSelector((state) => state.common);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customFetch = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  });
  

  return customFetch;
};

export default CustomFetch;