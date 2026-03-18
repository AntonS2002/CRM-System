import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"

import {TodoListPage} from "./pages/TodoListPage.tsx";
import {ProfilePage} from "./pages/ProfilePage.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import { AuthLayout } from './layouts/AuthLayout.tsx';
import {SignupPage} from "./pages/SignupPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store"
import {logout} from "./util/auth.ts";
import {initAuth} from "./util/initAuth.ts";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import {UsersPage} from "./pages/UsersPage.tsx";

const router = createBrowserRouter([
            {path: "/", element: <Navigate to="/auth/signup" replace />},

            {
                path: "auth",
                element: <AuthLayout/>,
                children: [
                    {path: "signup", element: <SignupPage/>,},
                    {path: "login", element: <LoginPage/>},
                ]
            },

            {
                path: "app",
                element:
                    <ProtectedRoute>
                        <MainLayout/>
                    </ProtectedRoute>,
                loader: initAuth,
                children: [
                    {index: true, element: <Navigate to="/app/todos" replace />},
                    {path: "todos", element: <TodoListPage/>},
                    {path: "profile", element: <ProfilePage/>, hydrateFallbackElement: <div>Loading...</div>,},
                    {path: "users", element: <UsersPage/>}
                ]
            },
            {path: "/logout", action: logout}
])

function App() {

  return (
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>

  )
}

export default App
