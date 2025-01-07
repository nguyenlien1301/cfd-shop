import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import React from "react";
import { Link } from "react-router-dom";
import useBlogDetailPage from "./useBlogDetailPage";
import BlogCategories from "../BlogPage/BlogCategories";
import BlogTag from "../BlogPage/BlogTag";
import useBlogPage from "../BlogPage/useBlogPage";
import BlogContent from "./BlogContent";
import BlogPopular from "../BlogPage/BlogPopular";

const BlogDetailPage = () => {
  const { blogName, blogDataProps } = useBlogDetailPage();
  const { filterProps, tagFilterProps, blogPopularProps } = useBlogPage();
  return (
    <main className="main">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.BLOG}>Blog</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>{blogName || ""}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <BlogContent {...blogDataProps} />
            <aside className="col-lg-3">
              <div className="sidebar">
                <div className="widget widget-search">
                  <h3 className="widget-title">Search</h3>
                  <form action="#">
                    <label htmlFor="ws" className="sr-only">
                      Search in blog
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      name="ws"
                      id="ws"
                      placeholder="Search in blog"
                      required
                    />
                    <button type="submit" className="btn">
                      <i className="icon-search" />
                      <span className="sr-only">Search</span>
                    </button>
                  </form>
                </div>
                <BlogCategories {...filterProps} />
                <BlogPopular {...blogPopularProps} />
                <div className="widget widget-banner-sidebar">
                  <div className="banner-sidebar-title">ad box 280 x 280</div>
                  <div className="banner-sidebar">
                    <a href="#">
                      <img
                        src="/assets/images/blog/sidebar/banner.jpg"
                        alt="banner"
                      />
                    </a>
                  </div>
                </div>
                <BlogTag {...tagFilterProps} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailPage;
