import React from "react";
import useProductDetailPage from "./useProductDetailPage";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { PATHS } from "@/constants/paths";
import ProductDetailTop from "./ProductDetailTop";
import ProductDetailTab from "./ProductDetailTab";

const ProductDetailPage = () => {
	const { productName, productDetailTopProps, productDetailTabProps } =
		useProductDetailPage();
	return (
		<main className="main">
			<nav
				aria-label="breadcrumb"
				className="breadcrumb-nav border-0 mb-0"
			>
				<div className="container d-flex align-items-center">
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to={PATHS.HOME}>Home</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<Link to={PATHS.PRODUCTS}>Product</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item isActive>
							{productName || ""}
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>
			</nav>
			<div className="page-content">
				<div className="container">
					<ProductDetailTop {...productDetailTopProps} />
					<ProductDetailTab {...productDetailTabProps} />
				</div>
			</div>
		</main>
	);
};

export default ProductDetailPage;
