import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll to top, overriding smooth scroll behavior
    
    // Temporarily disable smooth scrolling
    const htmlElement = document.documentElement;
    const originalScrollBehavior = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    
    // Multiple scroll methods to ensure it works
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Restore original scroll behavior after a short delay
      setTimeout(() => {
        htmlElement.style.scrollBehavior = originalScrollBehavior;
      }, 100);
    });
    
  }, [pathname]);

  return null;
};

export default ScrollToTop;
