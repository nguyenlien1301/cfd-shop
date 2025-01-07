import React from "react";

const BlogTag = ({ tags }) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Browse Tags</h3>
      <div className="tagcloud">
        {tags?.map((tag, index) => {
          return (
            <a href="#" key={tag?.id + index}>
              {tag?.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BlogTag;
