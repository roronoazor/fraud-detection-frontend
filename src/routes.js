// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import RTLPage from "views/RTL/RTLPage.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import BankTable from "views/Dashboard/BankTable.js";
import MerchantTable from "views/Dashboard/MerchantTable.js";
import BankSummaryTable from "views/Dashboard/BankSummaryTable";
import MerchantSummaryTable from "views/Dashboard/MerchantSummaryTable";

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
import UserMgt from "views/Management/UserMgt";
import Settings from "views/Management/Settings";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/banks",
    name: "Banks",
    icon: <GiBank color="inherit" />,
    component: BankTable,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/merchants",
    name: "Merchants",
    icon: <BsPersonLinesFill color="inherit" />,
    component: MerchantTable,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/bankSummary",
    name: "Bank Summary",
    icon: <TbSum color="inherit" />,
    component: BankSummaryTable,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/merchantSummary",
    name: "Merchant Summary",
    icon: <MdOutlineSummarize color="inherit" />,
    component: MerchantSummaryTable,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <MdOutlineSummarize color="inherit" />,
    component: Settings,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    path: "/userMgt",
    name: "User Management",
    icon: <MdOutlineSummarize color="inherit" />,
    component: UserMgt,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  // {
  //   name: "ACCOUNT PAGES",
  //   category: "account",
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       icon: <PersonIcon color="inherit" />,
  //       secondaryNavbar: true,
  //       component: Profile,
  //       layout: "/admin",
  //       isProtected: true,
  //     },
  //     {
  //       path: "/signin",
  //       name: "Sign In",
  //       icon: <DocumentIcon color="inherit" />,
  //       component: SignIn,
  //       secondaryNavbar: false,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/signup",
  //       name: "Sign Up",
  //       icon: <RocketIcon color="inherit" />,
  //       secondaryNavbar: false,
  //       component: SignUp,
  //       layout: "/auth",
  //     },
  //   ],
  // },
];

export default dashRoutes;
