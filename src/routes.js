// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

import { GiBank } from "react-icons/gi";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlineSummarize } from "react-icons/md";
import { TbSum } from "react-icons/tb";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    isProtected: true,
  },
  {
    path: "/banks",
    name: "Banks",
    icon: <GiBank color="inherit" />,
    component: Tables,
    layout: "/admin",
    isProtected: true,
  },
  {
    path: "/merchants",
    name: "Merchants",
    icon: <BsPersonLinesFill color="inherit" />,
    component: Tables,
    layout: "/admin",
    isProtected: true,
  },
  {
    path: "/bankSummary",
    name: "Bank Summary",
    icon: <TbSum color="inherit" />,
    component: Tables,
    layout: "/admin",
    isProtected: true,
  },
  {
    path: "/merchantSummary",
    name: "Merchant Summary",
    icon: <MdOutlineSummarize color="inherit" />,
    component: Billing,
    layout: "/admin",
    isProtected: true,
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
        isProtected: true,
      }
    ],
  },
];

export default dashRoutes;
