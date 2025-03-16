import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Laoyouts/MainLayout";
import Home from "../../pages/Home"
import Collections from "../../pages/Collections"
import About from "../../pages/About"
import Contact from "../../pages/Contact"
import Product from './../../pages/Product';
import Cart from './../../pages/Cart';
import Login from './../../pages/Login';
import PleaceOrder from "../../pages/PleaseOrder";
import Order from "./../../pages/Order"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/collections",
                element: <Collections/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/product/:productId",
                element: <Product/>
            },
            {
                path: "/cart",
                element: <Cart/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/please-order",
                element: <PleaceOrder/>
            },
            {
                path: "/order",
                element: <Order/>
            }
        ]
    }
])

export default router;