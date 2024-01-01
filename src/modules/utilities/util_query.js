import toast from "react-hot-toast";
import axios from "axios";

export const fetchData = async ({ queryKey }) => {
  const [_key, { payload_data, url, authenticate, token }] = queryKey;
  const config = {};

  // add authorization token to headers for api call
  if (authenticate) {
    // if theres is no registered access token
    if (!token) {
      toast.error("you are not authenticated, please try logging in again");
      return;
    }

    const authorization = { Authorization: `Bearer ${token}` };
    config.headers = authorization;
  }
  let response_data = await axios.get(url, config);

  return response_data;
};

export const postData = async (data) => {
  // a hook that fetches data
  const { payload_data, url, authenticate, token } = data;

  const config = {};

  // add authorization token to headers for api call
  if (authenticate) {
    // if theres is no registered access token
    if (!token) {
      toast.error("you are not authenticated, please try logging in again");
      return;
    }

    const authorization = { Authorization: `Bearer ${token}` };
    config.headers = authorization;
  }

  let response_data = await axios.post(url, payload_data, config);

  return response_data;
};
