import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    selectUser:{},
    sidebarShow: true,
    accessToken: '',
    loggedUserDetail: {}
  },
  reducers: {
    showSideBar: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setUnFoldable: (state, action) => {
      state.sidebarShow = action.payload;
    },
    storeSelectedUser: (state, action) => {
      state.selectUser = action.payload;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }, 
    updateLoggedUserDetails: (state, action) => {
      state.loggedUserDetail = action.payload;
    }
  },
});

export const { showSideBar,setUnFoldable, storeSelectedUser, updateAccessToken, updateLoggedUserDetails } = commonSlice.actions;

const commonSliceReducer = commonSlice.reducer;
export default commonSliceReducer;
