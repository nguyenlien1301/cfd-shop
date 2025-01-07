import { message, Spin } from "antd";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { handleGetProfile } from "./store/reducer/authReducer";
import { handleGetCart } from "./store/reducer/cartReducer";
import tokenMethod from "./utils/token";
import "./assets/style.css";
import { PATHS } from "./constants/paths";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const AddressAccount = lazy(() =>
  import("@/pages/DashboardPage/AddressAccount")
);
const ListOrder = lazy(() => import("@/pages/DashboardPage/ListOrder"));
const WishList = lazy(() => import("@/pages/DashboardPage/WishList"));
const PrivateRoute = lazy(() => import("@/components/PrivateRoute"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const CheckoutSuccessPage = lazy(() => import("@/pages/CheckoutSuccessPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const FaqPage = lazy(() => import("@/pages/FaqPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const Page404 = lazy(() => import("@/pages/Page404"));
const PaymentMethodPage = lazy(() => import("@/pages/PaymentMethodPage"));
const PrivatePolicyPage = lazy(() => import("@/pages/PrivatePolicyPage"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetailPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage"));
const ReturnPage = lazy(() => import("@/pages/ReturnPage"));
const ShippingPage = lazy(() => import("@/pages/ShippingPage"));
const ChangePass = lazy(() => import("@/pages/DashboardPage/ChangePass"));
const FormAccount = lazy(() => import("@/pages/DashboardPage/FormAccount"));

// import MainLayout from "@/layouts/MainLayout";
// import AddressAccount from "@/pages/DashboardPage/AddressAccount";
// import ListOrder from "@/pages/DashboardPage/ListOrder";
// import WishList from "@/pages/DashboardPage/WishList";
// import PrivateRoute from "./components/PrivateRoute";
// import AboutPage from "./pages/AboutPage";
// import BlogPage from "./pages/BlogPage";
// import CartPage from "./pages/CartPage";
// import CheckoutPage from "./pages/CheckoutPage";
// import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
// import ContactPage from "./pages/ContactPage";
// import DashboardPage from "./pages/DashboardPage";
// import FaqPage from "./pages/FaqPage";
// import HomePage from "./pages/HomePage";
// import Page404 from "./pages/Page404";
// import PaymentMethodPage from "./pages/PaymentMethodPage";
// import PrivatePolicyPage from "./pages/PrivatePolicyPage";
// import ProductDetailPage from "./pages/ProductDetailPage";
// import ProductPage from "./pages/ProductPage";
// import ReturnPage from "./pages/ReturnPage";
// import ShippingPage from "./pages/ShippingPage";
// import ChangePass from "@/pages/DashboardPage/ChangePass";
// import FormAccount from "@/pages/DashboardPage/FormAccount";
// import BlogDetailPage from "./pages/BlogDetailPage";

function App() {
  const dispatch = useDispatch();
  const spinStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  useEffect(() => {
    // antd message config
    message.config({
      top: 80,
      duration: 3,
      maxCount: 3,
    });

    if (tokenMethod.get()) {
      // handleGetProfile
      dispatch(handleGetProfile());
      // handleGetCart
      dispatch(handleGetCart());
    }
  }, []);

  return (
    <Suspense fallback={<Spin style={spinStyle}></Spin>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PATHS.PRODUCTS} element={<ProductPage />} />
            <Route
              path={PATHS.PRODUCT_DETAIL}
              element={<ProductDetailPage />}
            />

            <Route path={PATHS.FAQ} element={<FaqPage />} />
            <Route
              path={PATHS.PAYMENT_METHOD}
              element={<PaymentMethodPage />}
            />
            <Route path={PATHS.RETURN} element={<ReturnPage />} />
            <Route path={PATHS.SHIPPING} element={<ShippingPage />} />

            <Route path={PATHS.BLOG} element={<BlogPage />} />
            <Route path={PATHS.BLOG_SINGLE} element={<BlogDetailPage />} />
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route
              path={PATHS.PRIVATE_POLICY}
              element={<PrivatePolicyPage />}
            />

            <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
              <Route path={PATHS.PROFILE.INDEX} element={<DashboardPage />}>
                <Route index element={<FormAccount />} />
                <Route
                  path={PATHS.PROFILE.PROFILE_ORDER}
                  element={<ListOrder />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_WISHLIST}
                  element={<WishList />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_ADDRESS}
                  element={<AddressAccount />}
                />
                <Route
                  path={PATHS.PROFILE.PROFILE_CHANGE_PASS}
                  element={<ChangePass />}
                />
              </Route>
              <Route path={PATHS.CART} element={<CartPage />} />
              <Route path={PATHS.CHECKOUT} element={<CheckoutPage />} />
              <Route
                path={PATHS.CHECKOUT_SUCCESS}
                element={<CheckoutSuccessPage />}
              />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
