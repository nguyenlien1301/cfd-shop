import React, { useEffect } from "react";
import useMutation from "@/hooks/useMutation";
import blogService from "@/services/blogService";
import queryString from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import { PATHS } from "@/constants/paths";

const BLOG_LIMITS = 6;
const useBlogPage = () => {
  const { search, pathname } = useLocation();
  const queryObject = queryString.parse(search);
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
    execute: fetchBlogs,
  } = useMutation((query) =>
    blogService.getBlog(query || `?limit=${BLOG_LIMITS}`)
  );
  const blogs = blogData?.blogs || [];
  const blogsPagination = blogData?.pagination || [];
  const blogsListLoading = useDebounce(blogLoading, 1000);
  useEffect(() => {
    fetchBlogs(search);
  }, [search]);
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(blogService.getCategories);
  const categories = categoriesData?.blogs || [];

  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery(blogService.getBlogTags);
  const tags = tagsData?.blogs || [];
  // General Functions
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: BLOG_LIMITS,
    });
    if (pathname.includes(PATHS.BLOG)) {
      navigate(`${PATHS.BLOG}?${newQueryString}`);
    } else {
      setSearchParams(new URLSearchParams(newQueryString));
    }
  };
  // Pagination Props
  const onPaginationChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  // filter cate
  const onCateFilterChange = (cateId) => {
    let newCategoryQuery = cateId;
    if (!cateId) {
      newCategoryQuery = [];
    }
    updateQueryString({
      ...queryObject,
      category: newCategoryQuery,
      page: 1,
    });
  };
  // Filter Props
  const onResetFilterChange = () => updateQueryString({});

  const blogListProps = {
    isLoading: blogsListLoading,
    isError: !!blogError,
    blogs,
  };

  const paginationProps = {
    page: Number(blogsPagination.page || queryObject.page || 1),
    limit: Number(blogsPagination.limit || 0),
    total: Number(blogsPagination.total || 0),
    onPaginationChange,
  };
  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isErorr: categoriesError,
    blogLength: blogs?.length,
    activeCategory: queryObject.category,
    onResetFilterChange,
    onCateFilterChange,
  };

  const tagFilterProps = {
    tags,
    isLoading: tagsLoading,
    isErorr: tagsError,
  };

  const blogPopularProps = {
    blogPopular: blogs
      ?.filter((item) => {
        return item?.updatedAt && new Date(item?.updatedAt) < new Date();
      })
      ?.slice(0, 4),
  };
  return {
    blogListProps,
    paginationProps,
    filterProps,
    tagFilterProps,
    blogPopularProps,
  };
};

export default useBlogPage;
