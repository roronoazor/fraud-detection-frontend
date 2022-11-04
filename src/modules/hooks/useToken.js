import { useState } from 'react';

export const etopReportingToken = 'reporting-xxx';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem(etopReportingToken);
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem(etopReportingToken, JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}