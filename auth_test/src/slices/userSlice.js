import { createSlice } from "@reduxjs/toolkit";


const initialData = {
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
}

const userSlice = createSlice({
    name: "user",
    initialState:initialData,
    reducers:{
        setUser:(state,action)=>{
            state.user= action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logoutUser:(state,action)=>{
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setUser,logoutUser} = userSlice.actions;
export default  userSlice.reducer