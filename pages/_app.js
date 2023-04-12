import '@/styles/globals.scss'
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import {store} from '@/store';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}