import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import React from "react";
import { Link } from "react-router-dom";
import useBlogPage from "./useBlogPage";
import Pagination from "@/components/Pagination";
import BlogList from "./BlogList";
import { PAGI_TYPE } from "@/constants/general";
import BlogCategories from "./BlogCategories";
import BlogTag from "./BlogTag";
import BlogPopular from "./BlogPopular";

const BlogPage = () => {
  const {
    blogListProps,
    paginationProps,
    filterProps,
    tagFilterProps,
    blogPopularProps,
  } = useBlogPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{
          backgroundImage: 'url("/assets/images/page-header-bg.jpg")',
        }}
      >
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <BlogList {...blogListProps} />
              <Pagination {...paginationProps} type={PAGI_TYPE.blog} />
            </div>
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
                  <div className="banner-sidebar banner-overlay">
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

export default BlogPage;
