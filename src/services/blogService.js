import axiosInstance from "@/utils/axiosInstance";

const blogService = {
  getBlog(query = "") {
    return axiosInstance.get(`/blogs${query}`);
  },
  getBlogBySlug(slug = "") {
    return axiosInstance.get(`/blogs/${slug}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/blog-categories${query}`);
  },
  getCategoriesSlug(slug = "") {
    return axiosInstance.get(`/blog-categories/${slug}`);
  },
  getBlogTags(query = "") {
    return axiosInstance.get(`/blog-tags`);
  },
  getBlogTagsSlug(slug = "") {
    return axiosInstance.get(`/blog-tags/${slug}`);
  },
};
export default blogService;
