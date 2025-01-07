import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import React from "react";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import CartSummary from "./CartSummary";
import useCartPage from "./useCartPage";

const CartPage = () => {
	const { cartTableProps, cartSummaryProps } = useCartPage();
	return (
		<main className="main">
			<div
				className="page-header text-center"
				style={{
					backgroundImage: 'url("/assets/images/page-header-bg.jpg")',
				}}
			>
				<div className="container">
					<h1 className="page-title">Shopping Cart</h1>
				</div>
			</div>
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to={PATHS.HOME}>Home</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					<Link to={PATHS.PRODUCTS}>Product</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
			</Breadcrumb>
			<div className="page-content">
				<div className="cart">
					<div className="container">
						<div className="row">
							<CartTable {...cartTableProps} />
							<CartSummary {...cartSummaryProps} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CartPage;
