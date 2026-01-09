import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {RootLayout} from "./pages/Root/RootLayout.tsx";
import {TodoListPage} from "./pages/TodoListPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
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
