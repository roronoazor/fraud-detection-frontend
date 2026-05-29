import axios from "axios";

let unauthorizedRedirectIsConfigured = false;

const loginPath = `${process.env.PUBLIC_URL || ""}/auth-login`;

const isLoginPage = () => window.location.pathname === loginPath;

const redirectToLogin = () => {
  localStorage.removeItem("accessToken");
  if (!isLoginPage()) {
    window.location.replace(loginPath);
  }
};

export const setupUnauthorizedRedirect = () => {
  if (unauthorizedRedirectIsConfigured) {
    return;
  }

  unauthorizedRedirectIsConfigured = true;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        error.wasHandledAsUnauthorized = true;
        redirectToLogin();
      }

      return Promise.reject(error);
    },
  );
};

