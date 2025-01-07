import useQuery from "@/hooks/useQuery";
import blogService from "@/services/blogService";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useBlogDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { data: blogDetailData } = useQuery(
    () => blogService.getBlogBySlug(slug),
    [slug]
  );
  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useQuery(blogService.getBlogTags);
  const tag = tagsData?.blogs || [];
  const { tags, name } = blogDetailData || {};

  const blogDataProps = {
    ...blogDetailData,
    filterTags: tag.filter((item) => tags?.includes(item.id)),
  };
  return { blogName: name, blogDataProps };
};

export default useBlogDetailPage;
