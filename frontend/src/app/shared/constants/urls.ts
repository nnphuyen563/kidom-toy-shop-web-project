import ENV from '../../../../../env.json';

const BASE_URL = 'https://kidom-api.orangeplant-4c85546b.australiaeast.azurecontainerapps.io';

export const PRODUCTS_URL = BASE_URL + '/api/product';

export const CATEGORIES_URL = PRODUCTS_URL + '/category';

export const THUMB_URL = PRODUCTS_URL + '/thumb';
export const THUMB_BY_ID_URL = THUMB_URL + '/';

export const PRODUCT_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCT_BY_CATE_URL = PRODUCTS_URL + '/category/';
export const PRODUCT_BY_ID_URL = PRODUCTS_URL + '/';
export const PRODUCT_UPLOAD_PRODUCT_URL = PRODUCTS_URL + '/upload';
export const PRODUCT_UPLOAD_IMAGE_URL = PRODUCTS_URL + '/image/upload';
export const PRODUCT_DELETE_URL = PRODUCTS_URL + '/delete/';

export const PRODUCT_IMAGE_URL = PRODUCTS_URL + '/image/';
export const PRODUCT_IMAGE_DELETE_URL = PRODUCT_IMAGE_URL + 'delete/';

export const USER_URL = BASE_URL + '/api/user';
export const USER_LOGIN_URL = USER_URL + '/login';
export const USER_REGISETER_URL = USER_URL + '/register'