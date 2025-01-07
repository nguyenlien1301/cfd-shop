import { PATHS } from "@/constants/paths";
import { formatDate } from "@/utils/format";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1; // số dòng
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const BlogPopular = ({ blogPopular }) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Popular Posts</h3>
      <ul className="posts-list">
        {blogPopular?.map((item, index) => {
          const { id, image, updatedAt, name, slug } = item || {};
          const blogPath = PATHS.BLOG + `/${slug}`;
          return (
            <li key={id + index}>
              <figure>
                <Link to={blogPath}>
                  <img src={image} alt="post" />
                </Link>
              </figure>
              <div>
                <span>{formatDate(updatedAt, "MMM DD, YYYY")}</span>
                <Title>
                  <Link to={blogPath}>{name}</Link>
                </Title>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogPopular;
