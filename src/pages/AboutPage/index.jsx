import Breadcrumb from "@/components/Breadcrumb";
import { PATHS } from "@/constants/paths";
import React from "react";
import { Link } from "react-router-dom";
import useHomePage from "../HomePage/useHomePage";
import useAboutPage from "./useAboutPage";

const AboutPage = () => {
  const { brandProps } = useHomePage();
  const { aboutProps } = useAboutPage();

  const { title, subTitle, abouts } = aboutProps || {};
  const {
    banner,
    title1,
    title2,
    title3,
    description1,
    description2,
    description3,
    image1,
    image2,
    titleBrand,
    descriptionBrand,
  } = abouts || {};
  return (
    <main className="main">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>About us</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <h1 className="page-title text-white">
            {title || "About us"}{" "}
            <span className="text-white">{subTitle || ""}</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h2 className="title">{title1}</h2>
              <p>{description1 || ""}</p>
            </div>
            <div className="col-lg-6">
              <h2 className="title">{title2}</h2>
              <p>{description2 || ""}</p>
            </div>
          </div>
          <div className="mb-5" />
        </div>
        <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <h2 className="title">{title3 || ""}</h2>
                <p className="lead text-primary mb-3">{description3}</p>
                <p className="mb-2">{description2}</p>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="about-images">
                  <img src={image1} alt className="about-img-front" />
                  <img src={image2} alt className="about-img-back" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="brands-text">
                <h2 className="title">{titleBrand || ""}</h2>
                <p>{descriptionBrand || ""}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="brands-display">
                <div className="row justify-content-center">
                  {brandProps?.brands?.map((brand, index) => {
                    return (
                      <div className="col-6 col-sm-4" key={index}>
                        <div href="#" className="brand">
                          <img src={brand} alt="Brand Name" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2" />
      </div>
    </main>
  );
};

export default AboutPage;
