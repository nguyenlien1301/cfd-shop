import ProductCard from "@/components/ProductCard";
import cn from "@/utils/cn";
import owlCarousels from "@/utils/owlCarousels";
import React, { useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const FeaturedSection = ({
  categories,
  featureProducts,
  selectedCateSlug,
  handleSelectCate,
}) => {
  const isLoading = useDebounce(!featureProducts?.length, 300);

  useEffect(() => {
    owlCarousels();
  }, [isLoading]);

  const _onSelectCate = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelectCate?.("");
    setTimeout(() => {
      handleSelectCate?.(slug);
    }, 200);
  };

  return (
    <div className="container top" style={{ height: 505 }}>
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {categories?.map((category, index) => {
              const { name, slug } = category || {};
              return (
                <li className="nav-item" key={index}>
                  <a
                    className={cn("nav-link", {
                      active: selectedCateSlug === slug,
                    })}
                    // id="top-all-link"
                    // data-toggle="tab"
                    href="#top-all-tab"
                    // role="tab"
                    // aria-controls="top-all-tab"
                    // aria-selected="true"
                    onClick={(e) => _onSelectCate(e, slug)}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          className={cn("tab-pane p-0 fade", {
            "show active": featureProducts?.length > 0,
          })}
          id="top-all-tab"
          role="tabpanel"
          aria-labelledby="top-all-link"
        >
          {!isLoading && featureProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                            "nav": true, 
                                            "dots": false,
                                            "margin": 20,
                                            "loop": false,
                                            "responsive": {
                                                "0": {
                                                    "items":2
                                                },
                                                "480": {
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
              {featureProducts?.map((product, index) => {
                return (
                  <ProductCard key={product.id || index} product={product} />
                );
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

export default FeaturedSection;
