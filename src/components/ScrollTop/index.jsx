import cn from "@/utils/cn";
import scrollTop from "@/utils/scrollTop";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ButtonBackToTop = styled.button`
  background-color: #fcb941 !important;
  border: 1px solid transparent !important;
  border-radius: 50px !important;
  &:hover {
    background-color: white !important;
    border: 1px solid #fcb941 !important;
  }
  i {
    color: white;
    transition: all 0.4s ease !important;
  }
  &:hover > i {
    color: black;
  }
`;
const ScrollTop = () => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if ($(window).scrollTop() >= 400) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if ($(window).scrollTop() >= 400) {
          setIsShow(true);
        } else {
          setIsShow(false);
        }
      });
    };
  }, []);

  return (
    <ButtonBackToTop
      id="scroll-top"
      title="Back to Top"
      className={cn({ show: isShow })}
      onClick={scrollTop}
    >
      <i className="icon-arrow-up" />
    </ButtonBackToTop>
  );
};

export default ScrollTop;
