import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
    name:'auth',
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000/api/user",credentials:"include"}),
    endpoints:(builder) => ({
     register : builder.mutation({
        query : (data)=>({
            url : '/register',
            method : "POST",
            body : data
        })
     }),
     logout : builder.mutation({
        query : ()=>({
            url : '/logout',
            method : "POST",
        })
     })
    })
});

export const {useRegisterMutation,useLogoutMutation} = authApi;
export default authApi;