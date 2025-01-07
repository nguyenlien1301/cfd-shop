import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { PATHS } from "@/constants/paths";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Description = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3; // số dòng
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const BlogList = ({ isLoading, isError, blogs }) => {
  if ((!isLoading && !!!blogs?.length) || isError)
    return (
      <div className="entry-container max-col-2" data-layout="fitRows">
        There is no blog
      </div>
    );

  if (isLoading) {
    return (
      <div className="entry-container max-col-2" data-layout="fitRows">
        {new Array(9).fill("").map((_, index) => {
          return (
            <ProductCardSkeleton key={index} className="entry-item col-sm-6" />
          );
        })}
      </div>
    );
  }

  return (
    <div className="entry-container max-col-2" data-layout="fitRows">
      {blogs?.map((blog, index) => {
        const { id, image, updatedAt, author, name, description, slug } =
          blog || {};
        const blogPath = PATHS.BLOG + `/${slug}`;
        return (
          <div className="entry-item col-sm-6" key={id + index}>
            <article className="entry entry-grid">
              <figure className="entry-media">
                <Link to={blogPath}>
                  <img src={image || ""} alt="image desc" />
                </Link>
              </figure>
              <div className="entry-body">
                <div className="entry-meta">
                  <span>{formatDate(updatedAt, "MMM DD, YYYY")}</span>
                  <span className="meta-separator">|</span>
                  <span className="entry-author">
                    {" "}
                    by <a href="#">{author}</a>
                  </span>
                </div>
                <h2 className="entry-title">
                  <Link to={blogPath}>{name}</Link>
                </h2>
                <div className="entry-content">
                  <Description
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  ></Description>
                  <Link to={blogPath} className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
