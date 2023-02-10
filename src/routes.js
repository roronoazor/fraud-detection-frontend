// import
import Dashboard from "views/Dashboard/Dashboard.js";
import BankTable from "views/Dashboard/BankTable.js";
import MerchantTable from "views/Dashboard/MerchantTable.js";
import BankSummaryTable from "views/Dashboard/BankSummaryTable";
import MerchantSummaryTable from "views/Dashboard/MerchantSummaryTable";
import FraudDashboard from "views/Dashboard/FraudDashbaord.js";
import BankSummaryChartPage from "views/Dashboard/BankSummaryChartPage";  
import TransactionPage from "views/Dashboard/TransactionPage";
import RuleStats from "views/Dashboard/RuleStats";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
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
    path: "/bankSummary2/:id",
    name: "BankSummaryChart",
    icon: <MdOutlineSummarize color="inherit" />,
    component: BankSummaryChartPage,
    layout: "/admin",
    isProtected: true,
    isVisible: false
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
  {
    path: "/transaction",
    name: " Transaction Overview",
    icon: <MdOutlineSummarize color="inherit" />,
    component: TransactionPage,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    name: "Fraud Monitoring",
    category: "account",
    state: "pageCollapse",
    isVisible: true,
    views: [
      {
        path: "/fraud",
        name: "Fraud Dashboard",
        icon: <PersonIcon color="inherit" />,
        icon: <MdOutlineSummarize color="inherit" />,
        component: FraudDashboard,
        layout: "/admin",
        isProtected: true,
        isVisible: true
      },
      {
        path: "/ruleStats",
        name: "Rule Metrics",
        icon: <StatsIcon color="inherit" />,
        icon: <MdOutlineSummarize color="inherit" />,
        component: RuleStats,
        layout: "/admin",
        isProtected: true,
        isVisible: true
      }
    ],
  },
];

export default dashRoutes;
