import { useEffect } from "react";
import { useGetRolesOnPageQuery } from "../redux/service/user";
import Home from "./Home";
import InsuranceReport from "./insuranceReport";
import LoginScreen from "./Login";
import UserAndRoles from "./User&roles";
import AttendanceReport from "./dailyAttendanceReport";
import index from "./Dashboard/indexDashBoard";


const tabs = [
    { key: "LOGIN", name: "LOGIN", component: LoginScreen },
    { key: 'USERANDROLES', name: "USERANDROLES", component: UserAndRoles },
    { key: 'INSURANCEREPORT', name: "INSURANCEREPORT", component: InsuranceReport },
    { key: "HOME", name: "HOME", component: Home },
    { key: "ATTENDANCEREPORT", name: "ATTENDANCEREPORT", component: AttendanceReport },
    { key: "DashBoard", name: "DashBoard", component:index  }
];

export default tabs;
