const isDevelopment = process.env.NODE_ENV === "development";
const BASE_URL = isDevelopment ? "http://127.0.0.1:8000/" : process.env.REACT_APP_BASE_URL;

export const LOGIN_URL = `${BASE_URL}api/auth/login/`;

export const LOGOUT_URL = BASE_URL + "api/auth/logout/";

export const GET_BANKS = BASE_URL + "api/banks/";

export const GET_MERCHANTS = BASE_URL + "api/merchants/";

export const GET_BANK_SUMMARIES = BASE_URL + "api/bank_summaries/";

export const GET_MERCHANT_SUMMARIES = BASE_URL + "api/merchant_summaries/";

export const GET_CREATE_USERS = BASE_URL + "api/auth/users/";

export const UPDATE_USER = BASE_URL + "api/auth/users/update/";

export const ACTIVATE_USERS = BASE_URL + "api/auth/activate_user/";

export const DEACTIVATE_USERS = BASE_URL + "api/auth/deactivate_user/";

export const DELETE_USERS = BASE_URL + "api/auth/delete_user/";

export const CHANGE_PASSWORD = BASE_URL + "api/auth/change_password/";

export const RESET_PASSWORD_URL = BASE_URL + "api/auth/reset_password/";

export const GET_TRANSACTIONS = BASE_URL + "api/transactions/";

export const GET_TRANSACTIONS_STATS = BASE_URL + "api/transactions/stats/";

export const GET_TRANSACTION_RULE_BREAKDOWN = BASE_URL + "api/transactions/rule/breakdown/";

export const GET_TRANSACTIONS_TYPE_BREAKDOWN = BASE_URL + "api/transactions/type/breakdown/";

export const GET_FRAUD_DASHBOARD = BASE_URL + "api/transactions/fraud/dashboard/";

export const GET_RULE_PREREQUISITE = BASE_URL + "api/rules/prerequisites/";

export const CREATE_RULE = BASE_URL + "api/rules/create/";

export const ACTIVATE_RULES = BASE_URL + "api/rules/activate/";

export const DEACTIVATE_RULES = BASE_URL + "api/rules/deactivate/";

export const GET_MERCHANT_VOLUMES_FOR_BAR_CHART = BASE_URL + "api/merchants/bar/series/";

export const GET_MERCHANT_ACTIVITY_FOR_PIE_CHART = BASE_URL + "api/merchants/pie/activity/";

export const GET_MERCHANT_TREND_FOR_LINE_CHART = BASE_URL + "api/merchants/trends/";

export const GET_MERCHANTS_USERS = BASE_URL + "api/merchants/users/";

// v2
export const GET_RULES_STATS = `${BASE_URL}api/rules/stats/`;
export const GET_FLAGGED_TXN_STATS = `${BASE_URL}api/flagged_txn/stats/`;
export const GET_TXN_STATS = `${BASE_URL}api/txn/stats/`;
export const GET_PERCENTAGE_FLAGGED_STATS = `${BASE_URL}api/flagged_txn/percentage/stats/`;
export const GET_TRANSACTION_TYPE_BREAKDOWN = `${BASE_URL}api/transaction/type/breakdown/`;
export const GET_PRODUCT_OVERVIEW_BREAKDOWN = `${BASE_URL}api/transaction/product/overview/`;
export const GET_CREATE_RULES = `${BASE_URL}api/rules/`;
export const GET_SPROUTPAY_ADMINS = `${BASE_URL}api/sproutpay/admins/`;
export const ACTIVATE_RULE = `${BASE_URL}api/rules/activate/`;
export const DEACTIVATE_RULE = `${BASE_URL}api/rules/deactivate/`;
export const GET_EDIT_RULE = `${BASE_URL}api/rules/edit/`;
export const EDIT_MERCHANT_MONITORING_METRIC = `${BASE_URL}api/merchants/monitoring/metric/`;
