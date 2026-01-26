import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {TodoListPage} from "./pages/TodoListPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {AuthLayout} from "./layouts/AuthLayout.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout/>,
    children: [
      {path: "/", element: <TodoListPage/>},
      {path: "/profile", element: <ProfilePage/>}
    ]

  }
])

function App() {

  return (
        <RouterProvider router={router}/>
  )
}

export default App
