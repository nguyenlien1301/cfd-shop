import PageLoading from "@/components/PageLoading";
import scrollTop from "@/utils/scrollTop";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);
  useEffect(() => {
    handleCloseMobileMenuShow();
    // setIsPageLoading(true);
    const myTimeout = setTimeout(() => {
      scrollTop();
      // setIsPageLoading(false);
    }, 500);
    return () => {
      clearTimeout(myTimeout);
    };
  }, [pathname]);

  const handleShowMobileMenuShow = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").addClass("mmenu-active");
  };
  const handleCloseMobileMenuShow = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").removeClass("mmenu-active");
  };

  if (isPageLoading) {
    return <PageLoading />;
  }

  return (
    <MainContext.Provider
      value={{
        handleShowMobileMenuShow,
        handleCloseMobileMenuShow,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const useMainContext = () => useContext(MainContext);
