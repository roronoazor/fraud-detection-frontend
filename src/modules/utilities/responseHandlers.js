import toast from "react-hot-toast";

/**
 *
 * function to handle api errors
 *
 * this function has side effects
 *
 * @args error - the error response from the api
 * @return null
 *
 */
export function handleApiError(error, customJSX) {
  let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
  toast.error(message);
  if (customJSX) {
    toast.custom(customJSX);
  } else {
    toast.error(message);
  }
  return;
}

/**
 *
 * function to handle api success
 *
 * this function has side effects
 *
 * @args response - success response from the api
 * @return null
 *
 */
export function handleApiSuccess(response, customJSX) {
  let message = response?.message || "Success";
  if (customJSX) {
    toast.custom(customJSX);
  } else {
    toast.success(message);
  }
  return;
}
