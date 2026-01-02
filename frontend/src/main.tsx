import React from 'react';
import ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {router} from './router/Router';
import { RouterProvider } from 'react-router-dom';
import './index.css';


ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)