import React from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal';
import './scss/main.scss'
import router from './Router'
import { AuthProvider } from './context/AuthProvider';


Modal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
