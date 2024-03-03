import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<RouterProvider router={router}/>
);


