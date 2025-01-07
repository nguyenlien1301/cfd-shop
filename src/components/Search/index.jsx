import { PATHS } from "@/constants/paths";
import useDebounce from "@/hooks/useDebounce";
import useProductPage from "@/pages/ProductPage/useProductPage";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const { onSearchFilterChange } = useProductPage();
  const [input, setInput] = useState("");
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
      onSearchFilterChange?.(inputText);
    }
    if (pathname !== PATHS.PRODUCTS) {
      navigate(`${PATHS.PRODUCTS}?search=${inputText}`);
    }
  };

  return (
    <div className="header-search">
      <a href="#" className="search-toggle" role="button" title="Search">
        <i className="icon-search" />
      </a>
      <form method="get" onSubmit={_onSearch}>
        <div className="header-search-wrapper">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            className="form-control"
            name="search"
            id="search"
            placeholder="Search in..."
            value={input}
            onChange={_onChangeInput}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
