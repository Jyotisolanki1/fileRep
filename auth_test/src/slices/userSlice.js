import { createSlice } from "@reduxjs/toolkit";


const initialData = {
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
}

const userSlice = createSlice({
    name: "user",
    initialState:initialData,
    reducers:{
        setUser:(state,action)=>{
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logoutUser:(state,action)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const {setUser,logoutUser} = userSlice.actions;
export default  userSlice.reducer