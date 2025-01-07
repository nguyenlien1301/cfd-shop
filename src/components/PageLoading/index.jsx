import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: white;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const PageLoading = () => {
  return (
    <Loading>
      <Spin />
    </Loading>
  );
};

export default PageLoading;
