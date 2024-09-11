import { useEffect, useState } from "react";

interface ScreenSize {
  screenSize: number | undefined;
  isMobile: boolean;
  isMediumScreen: boolean;
  isDesktop: boolean;
  isLargerScreen: boolean;
}

const getIsMobile = (width: number | undefined): boolean =>
  width !== undefined && width <= 767;
const getIsMediumScreen = (width: number | undefined): boolean =>
  width !== undefined && width <= 1023;
const getIsDesktop = (width: number | undefined): boolean =>
  width !== undefined && width >= 1024;
const getIsLargerScreen = (width: number | undefined): boolean =>
  width !== undefined && width > 1439;

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargerScreen, setIsLargerScreen] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setScreenSize(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenSize(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    setIsMobile(getIsMobile(screenSize));
    setIsDesktop(getIsDesktop(screenSize));
    setIsLargerScreen(getIsLargerScreen(screenSize));
    setIsMediumScreen(getIsMediumScreen(screenSize));
  }, [screenSize]);

  return { screenSize, isMobile, isMediumScreen, isDesktop, isLargerScreen };
};

export default useScreenSize;
