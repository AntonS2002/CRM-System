import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {TodoListPage} from "./pages/TodoListPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
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
