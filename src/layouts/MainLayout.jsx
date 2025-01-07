import AuthenModal from "@/components/AuthenModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MobileMenu } from "@/components/MobileMenu";
import ScrollTop from "@/components/ScrollTop";
import AuthContextProvider from "@/context/AuthContext";
import MainContextProvider from "@/context/MainContext";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<MainContextProvider>
			{/* <AuthContextProvider> */}
				<div className="page-wrapper">
					<Header />
					<Outlet />
					<Footer />
				</div>
				<ScrollTop />
				<MobileMenu />
				<AuthenModal />
			{/* </AuthContextProvider> */}
		</MainContextProvider>
	);
};

export default MainLayout;
