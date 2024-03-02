const BASE_URL = 'http://localhost:5000/api';

export const ALL_FOODS_URL = BASE_URL + '/foods';
export const FOOD_BY_ID_URL = BASE_URL + '/foods/';
export const FOODS_BY_SEARCH_TERM_URL = BASE_URL + '/foods/search/';
export const ALL_TAGS_URL = BASE_URL + '/foods/tags';
export const FOODS_BY_TAG = BASE_URL + '/foods/tag/';

export const USERS_BASE_URL = BASE_URL + '/users/';
export const USER_LOGIN_URL = BASE_URL + '/users/login';
export const USER_REGISTER_URL = BASE_URL + '/users/register';

export const ALL_ORDERS_URL = BASE_URL + '/orders';
export const CREATE_ORDER_URL = BASE_URL + '/orders/create';
export const GET_ORDER_FOR_CURRENT_USER_URL = BASE_URL + '/orders/newOrderForCurrentUser';
export const ORDER_PAY_URL = BASE_URL + '/orders/pay';
export const ORDER_TRACK_URL = BASE_URL + '/orders/track/';
export const ALL_ORDERS_FOR_USER_URL = BASE_URL + '/orders/user/';
