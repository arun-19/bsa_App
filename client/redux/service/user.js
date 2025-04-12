import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, LOGIN_API, UserDetails, USERS_API } from "../../constants/apiUrl";

const UsersApi = createApi({
    reducerPath: "loginUser",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({


        loginUser: builder.mutation({
            query: (payload) => ({
                url: LOGIN_API,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["Login"],
        }),
        getUsers: builder.query({
            query: () => {

                return {
                    url: USERS_API,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["Users"],
        }),getUsersDetails: builder.query({
            query: () => {
                return {
                    url: UserDetails,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["UsersDetails"],
        }),
        getUserDet: builder.query({
            query: () => {

                return {
                    url: `${USERS_API}/getUserDet`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["Users"],
        }),getUserBasicDetails:builder.query({
            query: ({Idcard}) => {
                return {
                    url: `${USERS_API}/getUserBasicDetails`,
                    method: "GET",
                    params:{Idcard},
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["/getUserBasicDetails"],
        }),
        getDesignation: builder.query({
            query: () => {

                return {
                    url: `${USERS_API}/getDesignation`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },

                };
            },
            providesTags: ["UsersDes"],
        }),
        getRolesOnPage: builder.query({
            query: ({ params }) => {

                return {
                    url: `${USERS_API}/getRolesOnPage`,
                    method: "GET",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    params,
                };
            },
            providesTags: ["UsersRole"],
        }),
        createRoleOnPage: builder.mutation({
            query: (payload) => ({
                url: USERS_API + "/createRoleOnPage",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["LoginRole"],
        }),
        UpdateRoleOnPage:
        builder.mutation({
            query: (payload) => ({
                url: USERS_API + "/UpdateRoleOnPage",
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["UpdateRoleonPage"],
        }),

        createUser: builder.mutation({
            query: (payload) => ({
                url: USERS_API,
                method: "POST",
                body: payload,
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }),
            invalidatesTags: ["UsersCreate"],
        }),
        UploadImage: builder.mutation({
            query: (payload) => ({
                url: USERS_API+"/upload",
                method: "POST",
                body: payload,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                
            }),
            invalidatesTags: ["ImageUpload"],
        }),getUserImage:builder.query({
            query: (ID) => {

                return {
                    url: `${USERS_API}/getUserImage/${ID}`,
                    method: "GET",
                       
                };
            },
            providesTags: ["getUserImage"],
        })


    }),
});

export const {
    useLoginUserMutation,
    useGetUsersQuery,
    useCreateUserMutation,
    useGetUserDetQuery,
    useGetDesignationQuery,
    useGetRolesOnPageQuery,
    useCreateRoleOnPageMutation,
    useGetUserBasicDetailsQuery,
    useGetUsersDetailsQuery,
    useUpdateRoleOnPageMutation,
    useUploadImageMutation,
    useGetUserImageQuery

} = UsersApi;

export default UsersApi;
