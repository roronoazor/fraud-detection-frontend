const BASE_URL =  'http://localhost:8000/';

export const LOGIN_URL = BASE_URL + 'authentication/login/';

export const LOGGOUT_URL = BASE_URL + 'authentication/logout/';

export const GET_BANKS = BASE_URL + 'api/banks/';

export const GET_MERCHANTS = BASE_URL + 'api/merchants/';

export const GET_BANK_SUMMARIES = BASE_URL + 'api/bank_summaries/';

export const GET_MERCHANT_SUMMARIES = BASE_URL + 'api/merchant_summaries/';

export const GET_CREATE_USERS = BASE_URL + 'authentication/users/';

export const UPDATE_USER = BASE_URL + 'authentication/users/update/';

export const ACTIVATE_USERS = BASE_URL + 'authentication/activate_user/';

export const DEACTIVATE_USERS = BASE_URL + 'authentication/deactivate_user/';

export const DELETE_USERS = BASE_URL + 'authentication/delete_user/';

export const CHANGE_PASSWORD = BASE_URL + 'authentication/change_password/';

export const RESET_PASSWORD_URL = BASE_URL + 'authentication/reset_password/';

export const GET_TRANSACTIONS = BASE_URL + 'api/transactions/';

export const GET_TRANSACTIONS_STATS = BASE_URL + 'api/transactions/stats/';

export const GET_TRANSACTION_RULE_BREAKDOWN = BASE_URL + 'api/transactions/rule/breakdown/';

export const GET_TRANSACTION_TYPE_BREAKDOWN = BASE_URL + 'api/transactions/type/breakdown/';

export const GET_FRAUD_DASHBOARD = BASE_URL + 'api/transactions/fraud/dashboard/';