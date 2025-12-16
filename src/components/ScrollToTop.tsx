import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      
      // Add CSS class to override smooth scrolling during route changes
      htmlElement.classList.add('route-changing');
      bodyElement.classList.add('route-changing');
      
      // Store original scroll behavior
      const originalHtmlScrollBehavior = htmlElement.style.scrollBehavior;
      const originalBodyScrollBehavior = bodyElement.style.scrollBehavior;
      
      // Force auto scroll behavior
      htmlElement.style.scrollBehavior = 'auto';
      bodyElement.style.scrollBehavior = 'auto';
      
      // Detect mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       window.innerWidth <= 768;
      
      // Immediate scroll attempt
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      if (isMobile) {
        // Mobile-specific handling with multiple attempts
        const mobileScrollAttempts = () => {
          // First attempt
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          // Second attempt in next frame
          requestAnimationFrame(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Third attempt with slight delay for mobile browsers
            setTimeout(() => {
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              
              // Final cleanup
              setTimeout(() => {
                htmlElement.style.scrollBehavior = originalHtmlScrollBehavior;
                bodyElement.style.scrollBehavior = originalBodyScrollBehavior;
                htmlElement.classList.remove('route-changing');
                bodyElement.classList.remove('route-changing');
              }, 100);
            }, 50);
          });
        };
        
        // Start mobile scroll attempts
        mobileScrollAttempts();
      } else {
        // Desktop handling
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          
          setTimeout(() => {
            htmlElement.style.scrollBehavior = originalHtmlScrollBehavior;
            bodyElement.style.scrollBehavior = originalBodyScrollBehavior;
            htmlElement.classList.remove('route-changing');
            bodyElement.classList.remove('route-changing');
          }, 50);
        });
      }
    };

    // Execute scroll to top with a small delay to ensure route change is processed
    const timeoutId = setTimeout(scrollToTop, 0);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
