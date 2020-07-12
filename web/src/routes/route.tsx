import React from 'react';
import {
  RouteProps as ReactDomRouteProps,
  Route as ReactDomRout,
  Redirect,
} from 'react-router-dom';

import { isString } from 'util';
import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// private/ authenticated = ok
// private/ !authenticated = redirecionar para a tela de login
// !private/ authenticated = redirecionar para o dashboard
// !private/ !authenticated = ok

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <ReactDomRout
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
