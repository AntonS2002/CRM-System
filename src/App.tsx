import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"

import {TodoListPage} from "./pages/TodoListPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import { AuthLayout } from './layouts/AuthLayout.tsx';
import {SignupPage} from "./pages/SignupPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";




const router = createBrowserRouter([

  {path: "/", element: <Navigate to="/auth/signup" replace />},

  {
    path: "auth",
    element: <AuthLayout/>,
    children: [
      {path: "signup", element: <SignupPage/>},
      {path: "login", element: <LoginPage/>}
    ]
  },

  {
    path: "app",
    element: <MainLayout/>,
    children: [
      {index: true, element: <Navigate to="/app/todos" replace />},
      {path: "todos", element: <TodoListPage/>},
      {path: "profile", element: <ProfilePage/>}
    ]
  }

])

function App() {

  return (
        <RouterProvider router={router}/>
  )
}

export default App
