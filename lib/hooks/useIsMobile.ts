import { useWindowSize } from "#/lib/hooks/useWindowSize";
import { createContext, useContext } from "react";

const isMobile = () => {
  const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
};

export const useIsMobile = () => {
  const isSsrMobile = useContext(IsSsrMobileContext);
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 768;

  return isSsrMobile || isBrowserMobile;
};

export const useIsTablet = () => {
  const isSsrMobile = useContext(IsSsrMobileContext);
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 1024;

  return isSsrMobile || isBrowserMobile;
};

export const IsSsrMobileContext = createContext(false);
