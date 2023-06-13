import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TodoContainer from './app/main/pages/todo/TodoContainer.tsx';
import ErrorPage from './app/main/pages/error/error-page.tsx';
import NavBar from './app/components/navbar/NavBar.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoContainer />,
    errorElement: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="min-h-full">
      <NavBar />
          {
          // CONTENT
          }
          <RouterProvider router={router} />
   
    </div>

  </React.StrictMode>,
)
