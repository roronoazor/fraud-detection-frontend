import {
    Route,
    Redirect
  } from 'react-router-dom';
  
  function PrivateRoute({ children, isAuthenticated, ...rest }) {

    console.log('is authenticated', isAuthenticated);
    
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            isAuthenticated
              ? (
                <><h1>hello world</h1></>
              ) : (
                <Redirect
                  to={{
                    pathname: '/auth',
                    state: { from: location }
                  }}
                />
              ))
        }
      />
    );
  }
  
  export default PrivateRoute;