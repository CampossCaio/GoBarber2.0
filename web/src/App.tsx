import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Routes from './routes';

import AppProvider from './hooks';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppProvider>
    </>
  );
};

export default App;
