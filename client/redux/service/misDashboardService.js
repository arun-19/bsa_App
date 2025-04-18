import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, MIS_DASHBOARD } from "../../constants/apiUrl";


const MisDashboard = createApi({
    reducerPath: 'MisDashboard',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ['MisDashboard'],
    endpoints: (builder) => ({
        getMisDashboard: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD,
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }),
        getCommonData:builder.query({
            query: (params) => {
                return {
                    url: "/getCommon",
                    method: "POST",
                    body:{
                       table:params?.table,
                       fields:params?.fields,
                       where:params?.where,
                       map:params?.map || "true"
                    }
                }
            },
            providesTags: ['getCommonData'],
        }),
        getMisDashboardOrdersInHand: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD + "/getInsuranceData",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }),
        getMisDashboardOrdersInHandMonthWise: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD + "/getTotalStrength",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }),
        getMisDashboardActualVsBudgetValueMonthWise: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD + "/actualVsBudgetValueMonthWise",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }),
        getYearlyComp: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD + "/yearlyComp",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }), getLastMonthSalary: builder.query({
            query: ({ Idcard }) => {
                return {
                    url: MIS_DASHBOARD + "/getLastMonthSalary",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params:{
                        Idcard
                    }
                }
            },
            providesTags: ['MisDashboadgetLastMonthSalary'],
        }),

      
        getBuyerWiseRevenue: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD + "/buyerWiseRev",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }),

        getBudgetVsActual: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD + "/actualVsBudget",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }),
        getShortShipmantRatio: builder.query({
            query: ({ params }) => {
                return {
                    url: MIS_DASHBOARD + "/shortShipment",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['MisDashboard'],
        }),
        getYearWiseToTSalary:builder.query({
            query: (params ) => {
                return {
                    url: MIS_DASHBOARD + "/getYearWiseToTSalary",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['getYearWiseToTSalary'],
        }),
        getCurrentMonthLeaves:builder.query({
            query: (params) => {
                return {
                    url: MIS_DASHBOARD + "/getCurrentMonthLeaves",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params
                }
            },
            providesTags: ['getCurrentMonthLeaves'],
        }),
        getCurrentMonthLeaves:builder.query({
            query: ({Idcard}) => {
                return {
                    url: MIS_DASHBOARD + "/getCurrentMonthLeaves",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    params:{
                        Idcard
                    }
                }
            },
            providesTags: ['getCurrentMonthLeaves'],
        }),
        getTotalHeadCount:builder.query({
            query: () => {
                return {
                    url: MIS_DASHBOARD + "/getTotalHeadCount",
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            },
            providesTags: ['getTotalHeadCount'],
        }),
    getCateogryToTSalary:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getCateogryToTSalary",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getCateogryToTSalary'],
    }),
    ToTexpenses:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/ToTexpenses",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['ToTexpenses'],
    }),
    getMonthESIPF:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getMonthESIPF",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getMonthESIPF'],
    }),getOverTime:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getOverTime",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getOverTime'],
    }),getMoreDetails:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getMoreDetails",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getMoreDetails'],
    }),
    getESI:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getESI",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getESI'],
    }),getOverTimeWages:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getOverTimeWages",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getOverTimeWages'],
    }),
    getEachOverTimeWages:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getEachOverTimeWages",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getEachOverTimeWages'],
    }),
    getUserMobData:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getUserMobData",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getUserMobData'],
    }),getInOut:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getInOut",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getINOUT'],
    }),getgendercount:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getgendercount",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getgendercount'],
    }),
    getTotalPA:builder.query({
        query: ({params}) => {
            return {
                url: MIS_DASHBOARD + "/getTotalPA",
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },params
            }
        },
        providesTags: ['getTotalPA'],
    })

})
})

export const {
    useGetYearWiseToTSalaryQuery,
    useGetMisDashboardQuery,
    useGetMisDashboardOrdersInHandQuery,
    useGetMisDashboardOrdersInHandMonthWiseQuery,
    useGetMisDashboardActualVsBudgetValueMonthWiseQuery,
    useGetYearlyCompQuery,
    useGetBuyerWiseRevenueQuery,
    useGetBudgetVsActualQuery,
    useGetLastMonthSalaryQuery,
    useGetShortShipmantRatioQuery,
    useGetCurrentMonthLeavesQuery,
    useGetCommonDataQuery,
    useGetTotalHeadCountQuery,
    useGetCateogryToTSalaryQuery,
    useToTexpensesQuery,
    useGetMonthESIPFQuery,
    useGetOverTimeQuery,
    useGetMoreDetailsQuery,
    useGetESIQuery,
    useGetOverTimeWagesQuery,
    useGetEachOverTimeWagesQuery,
    useGetUserMobDataQuery,
    useGetInOutQuery,
    useGetgendercountQuery,
    useGetTotalPAQuery

} = MisDashboard;

export default MisDashboard;