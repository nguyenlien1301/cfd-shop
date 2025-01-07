import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const ProductList = ({ isLoading, isError, products }) => {
  if ((!isLoading && !!!products?.length) || isError)
    return (
      <div className="products mb-3">
        <div className="row justify-content-center">There is no products</div>
      </div>
    );

  if (isLoading) {
    return (
      <div className="products mb-3">
        <div className="row justify-content-center">
          {new Array(9).fill("").map((_, index) => {
            return (
              <ProductCardSkeleton
                key={index}
                className="col-6 col-md-4 col-lg-4"
              />
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="products mb-3">
      <div className="row justify-content-center">
        {products.map((product, index) => {
          return (
            <div key={product?.id || index} className="col-6 col-md-4 col-lg-4">
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
