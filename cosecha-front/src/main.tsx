import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/main.scss'
import { RouterProvider } from 'react-router-dom'
import router from './Router'
import Modal from 'react-modal';

Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
