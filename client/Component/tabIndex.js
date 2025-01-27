import Home from "./Home";
import InsuranceReport from "./insuranceReport";
import LoginScreen from "./Login";
import UserAndRoles from "./User&roles";

const tabs = [
    { name: "LOGIN", component: LoginScreen },
    { name: "USERANDROLES", component: UserAndRoles },
    { name: "INSURANCEREPORT", component: InsuranceReport },
    { name: "HOME", component: Home },
];

export default tabs;
