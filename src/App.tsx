import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import {AuthLayout} from "./layouts/AuthLayout.tsx";
import {AuthPage} from "./pages/AuthPage.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {TodoListPage} from "./pages/TodoListPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";



const router = createBrowserRouter([
  {path: "/", element: <Navigate to="/auth" replace />},

  {
      path: "/auth",
      element: <AuthLayout/>,
      children: [
        {index: true, element: <AuthPage/>}
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
