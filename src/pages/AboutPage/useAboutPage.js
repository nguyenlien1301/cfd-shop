import useQuery from "@/hooks/useQuery";
import { pageService } from "@/services/pageServices";
import React from "react";

const useAboutPage = () => {
  const { data: aboutData } = useQuery(() =>
    pageService.getPageDataByName("about us")
  );
  const { title, subTitle } = aboutData || {};
  const abouts = aboutData?.data || {};
  const aboutProps = {
    title,
    subTitle,
    abouts,
  };
  return { aboutProps };
};

export default useAboutPage;
