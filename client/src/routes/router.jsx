import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../pages/Home.jsx";
import AllProducts from "../pages/AllProducts.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import MyImports from "../pages/MyImports.jsx";
import MyExports from "../pages/MyExports.jsx";
import AddExport from "../pages/AddExport.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import NotFound from "../pages/NotFound.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-products", element: <AllProducts /> },
      {
        path: "products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "my-imports",
        element: (
          <PrivateRoute>
            <MyImports />
          </PrivateRoute>
        ),
      },
      {
        path: "my-exports",
        element: (
          <PrivateRoute>
            <MyExports />
          </PrivateRoute>
        ),
      },
      {
        path: "add-export",
        element: (
          <PrivateRoute>
            <AddExport />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
