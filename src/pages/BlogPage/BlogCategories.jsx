import { PATHS } from "@/constants/paths";
import React from "react";
import styled from "styled-components";

const BlogCategories = ({
  categories,
  onResetFilterChange,
  onCateFilterChange,
  blogLength,
  activeCategory,
}) => {
  const _onFilterChange = (e, id) => {
    e?.preventDefault();
    onCateFilterChange(id);
  };
  const _onResetChange = (e) => {
    e?.preventDefault();
    onResetFilterChange();
  };
  return (
    <div className="widget widget-cats">
      <h3 className="widget-title">Categories</h3>
      <ul>
        <li>
          <a href="#" onClick={_onResetChange} style={{ cursor: "pointer" }}>
            Clean All
          </a>
        </li>
        {categories?.map((item, index) => {
          const { id, name } = item || {};
          return (
            <li key={id + index}>
              <a
                href=""
                onClick={(e) => {
                  _onFilterChange(e, id);
                }}
                style={{ color: activeCategory === id ? "#fcb941" : "" }}
              >
                {name}
                {activeCategory === id && <span>{blogLength}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogCategories;
