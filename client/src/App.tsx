import React from 'react';
import './App.css';
import { checkAuth } from './app/stores/auth/async';
import { useAppDispatch } from './app/stores/stores';
import { AppRouter } from './routes';

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(checkAuth());
  }, []);
  // console.log('check', checkAuth);

  return <AppRouter />;
}

export default App;
