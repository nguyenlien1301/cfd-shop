import { useMainContext } from "@/context/MainContext";
import cn from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { MenuStyled } from "../StyledComponents";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "@/constants/paths";
import classNames from "classnames";
import useProductPage from "@/pages/ProductPage/useProductPage";
import ShareLink from "../ShareLink/ShareLink";

const MENUS = {
  menu: "menu",
  cate: "categories",
};

export const MobileMenu = () => {
  const pathUrl = window.location.href;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const { filterProps, onSearchFilterChange } = useProductPage();
  const { categories, activeCategory, onCateFilterChange } = filterProps || {};
  const [input, setInput] = useState("");
  const { handleCloseMobileMenuShow } = useMainContext();
  const [selectedTab, setSelectedTab] = useState(MENUS.menu);
  const _onTabChange = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };

  const trimmedInput = input.trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  const inputText =
    trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1).toLowerCase();
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (!params.has("search")) {
      setInput("");
    }
  }, [search]);
  const _onChangeInput = (e) => {
    setInput(e.target.value);
    if (!e.target.value) onSearchFilterChange?.(e.target.value);
  };
  const _onSearch = (e) => {
    e?.preventDefault();
    if (input) {
      handleCloseMobileMenuShow?.();
      onSearchFilterChange?.(inputText);
    }
    if (pathname !== PATHS.PRODUCTS) {
      navigate(`${PATHS.PRODUCTS}?search=${inputText}`);
    }
  };

  const _onFilterChange = (e, id, isChecked) => {
    e?.preventDefault();
    handleCloseMobileMenuShow?.();
    if (activeCategory.includes(id)) {
      onCateFilterChange?.();
    } else {
      onCateFilterChange(id, isChecked);
    }
    if (pathname !== PATHS.PRODUCTS) {
      navigate(`${PATHS.PRODUCTS}?category=${id}`);
    }
  };
  return (
    <div>
      {/* Mobile Menu */}
      <div
        className="mobile-menu-overlay"
        onClick={handleCloseMobileMenuShow}
      />
      {/* End .mobil-menu-overlay */}
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span
            className="mobile-menu-close"
            onClick={handleCloseMobileMenuShow}
          >
            <i className="icon-close" />
          </span>
          <form method="get" className="mobile-search" onSubmit={_onSearch}>
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="search"
              id="search"
              placeholder="Search in..."
              required
              value={input}
              onChange={_onChangeInput}
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.menu,
                })}
                // id="mobile-menu-link"
                // data-toggle="tab"
                href="#mobile-menu-tab"
                // role="tab"
                // aria-controls="mobile-menu-tab"
                // aria-selected="true"
                onClick={(e) => _onTabChange(e, MENUS.menu)}
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.cate,
                })}
                // id="mobile-cats-link"
                // data-toggle="tab"
                href="#mobile-cats-tab"
                // role="tab"
                // aria-controls="mobile-cats-tab"
                // aria-selected="false"
                onClick={(e) => _onTabChange(e, MENUS.cate)}
              >
                Categories
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={`tab-pane fade ${
                selectedTab === MENUS.menu ? "show active" : ""
              }`}
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <MenuStyled className="mobile-menu">
                  <li>
                    <NavLink to={PATHS.HOME}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.BLOG}>Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                  </li>
                </MenuStyled>
              </nav>
            </div>
            <div
              className={classNames("tab-pane fade", {
                show: selectedTab === MENUS.cate,
                active: selectedTab === MENUS.cate,
              })}
              id="mobile-cats-tab"
              role="tabpanel"
              aria-labelledby="mobile-cats-link"
            >
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  {categories?.map((category, index) => {
                    return (
                      <li key={category?.id + index}>
                        <a
                          className={`mobile-cats-lead ${activeCategory.includes(
                            category?.id || ""
                          )}`}
                          style={{
                            color: activeCategory.includes(category?.id || "")
                              ? "yellow"
                              : "inherit",
                          }}
                          id={activeCategory.includes(category?.id || "")}
                          href="#"
                          onClick={(e) => {
                            _onFilterChange(e, category?.id, e.target.id);
                          }}
                        >
                          {category?.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <div className="social-icons" style={{ gap: "20px" }}>
            <ShareLink title={"Facebook"} path={pathUrl}>
              <i className="icon-facebook-f" />
            </ShareLink>
            <ShareLink type="twitter" title={"Twitter"} path={pathUrl}>
              <i className="icon-twitter" />
            </ShareLink>
            <ShareLink type="instagram" title={"Instagram"} path={pathUrl}>
              <i className="icon-instagram" />
            </ShareLink>
            <a
              href="https://www.youtube.com/@CFDCircle"
              className="social-icon"
              target="_blank"
              title="Youtube"
            >
              <i className="icon-youtube" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
