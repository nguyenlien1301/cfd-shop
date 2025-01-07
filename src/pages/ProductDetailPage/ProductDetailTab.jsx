import cn from "@/utils/cn";
import { formatDate, transformNumberToPercent } from "@/utils/format";
import React, { useState } from "react";

const TABS = {
  desc: "description",
  shipping: "shipping&return",
  review: "review",
};

const ProductDetailTab = ({ description, shippingReturn, reviews }) => {
  const [activeTab, setActiveTab] = useState(TABS.desc);

  const _onTabChange = (e, tab) => {
    e?.preventDefault();
    e?.stopPropagation();
    setActiveTab(tab);
  };

  return (
    <div className="product-details-tab" style={{ minHeight: "30vh" }}>
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className={cn("nav-link", { active: activeTab === TABS.desc })}
            href="#product-desc-tab"
            onClick={(e) => _onTabChange(e, TABS.desc)}
          >
            Description
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", { active: activeTab === TABS.shipping })}
            href="#product-shipping-tab"
            onClick={(e) => _onTabChange(e, TABS.shipping)}
          >
            Shipping &amp; Returns
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", { active: activeTab === TABS.review })}
            href="#product-review-tab"
            onClick={(e) => _onTabChange(e, TABS.review)}
          >
            Reviews {`(${reviews?.length ?? 0})`}
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === TABS.desc && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div className="product-desc-content">
              <h3>Product Information</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          </div>
        )}
        {activeTab === TABS.shipping && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div className="product-desc-content">
              <h3>Delivery &amp; Returns</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: shippingReturn,
                }}
              />
            </div>
          </div>
        )}
        {activeTab === TABS.review && (
          <div
            className="tab-pane fade show active"
            id="product-desc-tab"
            role="tabpanel"
            aria-labelledby="product-desc-link"
          >
            <div className="reviews">
              <h3 style={{ fontWeight: 400 }}>
                {reviews?.length
                  ? `(Reviews ${reviews.length})`
                  : "There is no any reviews"}
              </h3>
              {reviews?.map((review) => {
                const {
                  id,
                  rate,
                  order,
                  updatedAt,
                  description: reviewDesc,
                } = review || {};
                return (
                  <div className="review" key={id}>
                    <div className="row no-gutters">
                      <div className="col-auto">
                        <h4>
                          <a href="#">#{order.slice(-4)}</a>
                        </h4>
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{
                                width: `${transformNumberToPercent(rate)}`,
                              }}
                            />
                          </div>
                        </div>
                        <span className="review-date">
                          {formatDate(updatedAt)}
                        </span>
                      </div>
                      <div className="col">
                        <div className="review-content">
                          <p>{reviewDesc}</p>
                        </div>
                        <div className="review-action">
                          <a href="#">
                            <i className="icon-thumbs-up" />
                            Helpful (2){" "}
                          </a>
                          <a href="#">
                            <i className="icon-thumbs-down" />
                            Unhelpful (0){" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailTab;
