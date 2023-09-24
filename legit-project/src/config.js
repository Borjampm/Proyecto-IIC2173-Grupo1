//const FRONT_PROXY = import.meta.env.PROXY;
const FRONT_PROXY = "http://localhost:5173";
const API_URL = "http://localhost:8000";

//Auth0 Config Params
const DOMAIN = "dev-ju2sb7gpzdrwv31f.us.auth0.com";
const CLIENT_ID = "Ss50jxHUP31QbXzYJHn2NHOiDP5CFrOP";
const REDIRECT_URI = `${FRONT_PROXY}/my-profile/`;
const SCOPE = "openid profile email logins_count";

export { FRONT_PROXY, API_URL, DOMAIN, CLIENT_ID, REDIRECT_URI, SCOPE };