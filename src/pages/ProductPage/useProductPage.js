import useQuery from "@/hooks/useQuery";
import { productService } from "@/services/productServices";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useMemo, useRef } from "react";
import { SORT_OPTIONS } from "@/constants/general";
import useDebounce from "@/hooks/useDebounce";
import useMutation from "@/hooks/useMutation";

const PRODUCT_LIMITS = 9;

const useProductPage = () => {
  // Initial Hooks
  const { search } = useLocation();
  const queryObject = queryString.parse(search);
  const priceFilterTimeout = useRef();
  const [_, setSearchParams] = useSearchParams();

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );
  const products = productsData?.products || [];
  const productsPagination = productsData?.pagination || {};
  const productListLoading = useDebounce(productsLoading, 1000);
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  // General Functions
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  const onSearchFilterChange = (value) => {
    let newSearchQuery = value;
    if (!value) {
      newSearchQuery = [];
    }
    updateQueryString({
      ...queryObject,
      search: newSearchQuery,
      category: [],
      page: 1,
    });
  };

  // Toolbox Props
  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (options) =>
          options.queryObject.orderBy === queryObject.orderBy &&
          options.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);

  // Toolbox Props
  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };
  // Pagination Props
  const onPaginationChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  // Filter Props

  const onCateFilterChange = (cateId, isChecked) => {
    let newCategoryQuery;
    if (isChecked === "") {
      newCategoryQuery = cateId;
    } else {
      newCategoryQuery = Array.isArray(queryObject.category)
        ? [...queryObject.category, cateId]
        : [queryObject.category, cateId];
      if (!isChecked) {
        newCategoryQuery = newCategoryQuery.filter(
          (category) => category !== cateId
        );
      }
    }

    // if (isChecked === "") {
    //   newCategoryQuery = cateId;
    // }

    if (!cateId) {
      newCategoryQuery = [];
    }

    updateQueryString({
      ...queryObject,
      search: [],
      category: newCategoryQuery,
      page: 1,
    });
  };
  // Filter Props
  const onResetFilterChange = () => updateQueryString({});
  // Filter Props
  const handlePriceFilterChange = (priceRange) => {
    if (priceRange?.length === 2) {
      if (priceFilterTimeout.current) {
        clearTimeout(priceFilterTimeout.current);
      }
      priceFilterTimeout.current = setTimeout(() => {
        updateQueryString({
          ...queryObject,
          minPrice: priceRange[0].substring(1),
          maxPrice: priceRange[1].substring(1),
          page: 1,
        });
      }, 500);
    }
  };

  const toolboxProps = {
    showNumb: products?.length || 0,
    totalNumb: productsPagination.total || 0,
    activeSort,
    onSortChange,
  };
  const paginationProps = {
    page: Number(productsPagination.page || queryObject.page || 1),
    limit: Number(productsPagination.limit || 0),
    total: Number(productsPagination.total || 0),
    onPaginationChange,
  };
  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    activeCategory: Array.isArray(queryObject.category)
      ? queryObject.category
      : [queryObject.category],
    currentPriceRange: [
      queryObject.minPrice || 0,
      queryObject.maxPrice || 1000,
    ],
    onCateFilterChange,
    handlePriceFilterChange,
    onResetFilterChange,
  };

  const productListProps = {
    isLoading: productListLoading,
    isError: !!productsError,
    products,
  };

  return {
    toolboxProps,
    productListProps,
    paginationProps,
    filterProps,
    onSearchFilterChange,
  };
};

export default useProductPage;
