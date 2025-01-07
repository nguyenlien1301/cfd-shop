import { PATHS } from "@/constants/paths";
import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccessPage = () => {
	return (
		<main className="main">
			<div className="content-success text-center">
				<div className="container">
					<h1 className="content-title">Your Order is Completed!</h1>
					<p>
						Your order has been completed. Your order details are
						shown for your personal accont.{" "}
					</p>
					<Link
						to={PATHS.PROFILE.PROFILE_ORDER}
						className="btn btn-outline-primary-2 btn-minwidth-lg"
					>
						<span>VIEW MY ORDERS</span>
						<i className="icon-long-arrow-right" />
					</Link>
				</div>
			</div>
		</main>
	);
};

export default CheckoutSuccessPage;
