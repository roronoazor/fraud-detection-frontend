// import
import Dashboard from "views/Dashboard/Dashboard.js";
import BankTable from "views/Dashboard/BankTable.js";
import MerchantTable from "views/Dashboard/MerchantTable.js";
import BankSummaryTable from "views/Dashboard/BankSummaryTable";
import MerchantSummaryTable from "views/Dashboard/MerchantSummaryTable";
import TransferSummary from "views/Dashboard/TransferSummary.js";
import FraudDashboard from "views/Dashboard/FraudDashbaord.js";
import BankSummaryChartPage from "views/Dashboard/BankSummaryChartPage";  
import TransactionPage from "views/Dashboard/TransactionPage";
import TxnRulesBreakdownPage from "views/Dashboard/TxnRulesBreakdownPage";
import RulesPage from "views/Dashboard/RulesPage";
import RulesCreateForm from "views/Dashboard/Forms/RulesCreateForm";
import RulesEditForm from "views/Dashboard/Forms/RulesEditForm";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

import { GiBank } from "react-icons/gi";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlineSummarize } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import UserMgt from "views/Management/UserMgt";
import Settings from "views/Management/Settings";
import TxnPieCharts from "views/Dashboard/TxnPieCharts";
import MerchantTransactionTrendPage from "views/Dashboard/MerchantMonitoring/MerchantTransactionTrendPage";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Fraud Dashboard",
    icon: <HomeIcon color="inherit" />,
    component: FraudDashboard,
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
    isVisible: false
  },
  {
    path: "/merchants",
    name: "Merchants",
    icon: <BsPersonLinesFill color="inherit" />,
    component: MerchantTable,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    path: "/bankSummary",
    name: "Bank Summary",
    icon: <TbSum color="inherit" />,
    component: BankSummaryTable,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    path: "/merchantSummary",
    name: "Merchant Summary",
    icon: <MdOutlineSummarize color="inherit" />,
    component: MerchantSummaryTable,
    layout: "/admin",
    isProtected: true,
    isVisible: false
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
    path: "/rules",
    name: " Rules Overview",
    icon: <MdOutlineSummarize color="inherit" />,
    component: RulesPage,
    layout: "/admin",
    isProtected: true,
    isVisible: true
  },
  {
    path: "/createRule",
    name: "Rules Create Form",
    icon: <MdOutlineSummarize color="inherit" />,
    component: RulesCreateForm,
    layout: "/admin",
    isProtected: true,
    isVisible: false
  },
  {
    path: "/rule/:id",
    name: "Rules Edit Form",
    icon: <MdOutlineSummarize color="inherit" />,
    component: RulesEditForm,
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
        // icon: <MdOutlineSummarize color="inherit" />,
        component: FraudDashboard,
        layout: "/admin",
        isProtected: true,
        isVisible: false
      },
      {
        path: "/pTransactionsChart",
        name: "Rule Metrics",
        icon: <StatsIcon color="inherit" />,
        // icon: <MdOutlineSummarize color="inherit" />,
        component: TxnPieCharts,
        layout: "/admin",
        isProtected: true,
        isVisible: true
      },
      {
        path: "/rulesBreakdown",
        name: "Txn. Breakdown by Rules",
        icon: <StatsIcon color="inherit" />,
        // icon: <MdOutlineSummarize color="inherit" />,
        component: TxnRulesBreakdownPage,
        layout: "/admin",
        isProtected: true,
        isVisible: true
      },
      {
        path: "/merchantTransactionTrend",
        name: "Merchant Txn. Trend",
        icon: <StatsIcon color="inherit" />,
        // icon: <MdOutlineSummarize color="inherit" />,
        component: MerchantTransactionTrendPage,
        layout: "/admin",
        isProtected: true,
        isVisible: true
      }
    ],
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    isVisible: false,
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
        isProtected: true,
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        secondaryNavbar: false,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: false,
        component: SignUp,
        layout: "/auth",
      },
    ],
  }
];

export default dashRoutes;
