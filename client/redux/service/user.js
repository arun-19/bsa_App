import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, LOGIN_API, USERS_API } from "../../constants/apiUrl";

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
            providesTags: ["Users"],
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
            providesTags: ["Users"],
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
            invalidatesTags: ["Login"],
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
            invalidatesTags: ["Users"],
        }),


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
} = UsersApi;

export default UsersApi;
