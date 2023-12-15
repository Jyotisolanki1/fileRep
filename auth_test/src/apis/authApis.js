import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
    name:'auth',
    baseQuery : fetchBaseQuery({baseUrl : "http://localhost:5000/api/user",credentials:"include"}),
    tagTypes:['auth'],
    endpoints:(builder) => ({
     register : builder.mutation({
        query : (data)=>({
            url : '/register',
            method : "POST",
            body : data
        }),
        invalidatesTags: ['auth'],
     }),
     logout : builder.mutation({
        query : ()=>({
            url : '/logout',
            method : "POST",
        }),
        invalidatesTags: ['auth'],
     }),
     login : builder.mutation({
        query : (data)=>({
            url : '/login',
            method : "POST",
            body: data
        }),
        invalidatesTags: ['auth'],
     }),
     updateData : builder.mutation({
        query : (data)=>({
            url : '/update',
            method : "PUT",
            body: data
        }),
        invalidatesTags: ['auth'],
     })
    })    
});

export const {useRegisterMutation,useLogoutMutation,useLoginMutation,useUpdateDataMutation} = authApi;
export default authApi;