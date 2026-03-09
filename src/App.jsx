import Signup from "./features/auth/components/Signup";
import ProductList from "./features/product/components/ProductList";
import Cart from "./features/cart/Cart";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Checkout from "./pages/Checkout";
import CartPage from "./pages/CartPage";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductDetailPage from "./pages/ProductDetailPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { store } from "./app/store";   // make sure path is correct
import Protected from "./features/auth/components/Protected";
import {selectLoggedInUser} from './features/auth/authSlice';
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./features/user/components/UserOrders";
import UserProfile from "./features/user/components/UserProfile";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./features/auth/components/ForgotPassword";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductFormPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrderPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/admin",
    element: <ProtectedAdmin>
      <AdminHome/></ProtectedAdmin>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage /></Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin>
      <AdminProductDetailPage /></ProtectedAdmin>,
  },
   {
    path: "/admin/product-form",
    element: <ProtectedAdmin>
<AdminProductFormPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin>
<AdminOrdersPage/></ProtectedAdmin>,
  },

   {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin>
<AdminProductFormPage /></ProtectedAdmin>,
  },
  {
    path: "*",
    element: <PageNotFound />
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />
  },
  {
    path: "/orders",
    element: <UserOrdersPage />
  },
   {
    path: "/profile",
    element: <UserProfilePage />
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>
  },
]);

function App() {
const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  
 useEffect(() => {
  if (user) {
    dispatch(fetchItemsByUserIdAsync(user.id));
    dispatch(fetchLoggedInUserAsync(user.id))
  }
  
}, [dispatch, user]);
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;