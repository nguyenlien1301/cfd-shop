import ProductCard from "@/components/ProductCard";
import cn from "@/utils/cn";
import owlCarousels from "@/utils/owlCarousels";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const TABS = {
  featured: "Featured",
  on_sale: "On Sale",
  top_rated: "Top Rated",
};

const HotProductSection = ({
  featuredProducts,
  onSaleProducts,
  topRatedProducts,
}) => {
  const [selectedTab, setSelectedTab] = useState(TABS.featured);

  const _onTabChange = (e, tab) => {
    e.preventDefault();
    setSelectedTab("");
    setTimeout(() => {
      setSelectedTab(tab);
    }, 200);
  };

  const _getSelectedProducts = (tab) => {
    switch (tab) {
      case TABS.featured:
        return featuredProducts;

      case TABS.on_sale:
        return onSaleProducts;

      case TABS.top_rated:
        return topRatedProducts;

      default:
        return [];
    }
  };

  const renderProducts = _getSelectedProducts(selectedTab);
  const isLoading = useDebounce(!renderProducts?.length, 300);

  useEffect(() => {
    owlCarousels();
  }, [isLoading]);

  return (
    <div className="container featured" style={{ height: 550 }}>
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.featured,
            })}
            // id="products-featured-link"
            // data-toggle="tab"
            href="#products-featured-tab"
            // role="tab"
            // aria-controls="products-featured-tab"
            // aria-selected="true"
            onClick={(e) => _onTabChange(e, TABS.featured)}
          >
            Featured
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.on_sale,
            })}
            // id="products-sale-link"
            // data-toggle="tab"
            href="#products-sale-tab"
            // role="tab"
            // aria-controls="products-sale-tab"
            // aria-selected="false"
            onClick={(e) => _onTabChange(e, TABS.on_sale)}
          >
            On Sale
          </a>
        </li>
        <li className="nav-item">
          <a
            className={cn("nav-link", {
              active: selectedTab === TABS.top_rated,
            })}
            // id="products-top-link"
            // data-toggle="tab"
            href="#products-top-tab"
            // role="tab"
            // aria-controls="products-top-tab"
            // aria-selected="false"
            onClick={(e) => _onTabChange(e, TABS.top_rated)}
          >
            Top Rated
          </a>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          className={cn("tab-pane p-0 fade", {
            "show active": renderProducts?.length > 0,
          })}
          role="tabpanel"
        >
          {!isLoading && renderProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                            "nav": true, 
                                            "dots": true,
                                            "margin": 20,
                                            "loop": false,
                                            "responsive": {
                                                "0": {
                                                    "items":2
                                                },
                                                "600": {
                                                    "items":2
                                                },
                                                "992": {
                                                    "items":3
                                                },
                                                "1200": {
                                                    "items":4
                                                }
                                            }
                                        }'
            >
              {renderProducts.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
          {isLoading && (
            <div className="row">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton
                  key={index}
                  className="col-6 col-md-4 col-lg-3"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotProductSection;
