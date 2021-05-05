import React, { useState, useEffect } from "react";
import "./BackToTopBtn.css";
import { useWindowScroll } from "react-use";
import hotLine from "../../images/hotLine2.png";

const BackToTopBtn = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) setVisible(true);
    else setVisible(false);
  }, [pageYOffset]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* <img
        style={{
          position: "sticky",
          bottom: "0px",
          left: "1900px",
          zIndex: "1",
        }}
        src={hotLine}
      /> */}
      {visible && (
        <div
          className="scroll-to-top cursor-pointer text-center"
          onClick={scrollToTop}
        >
          <i className="icon fas fa-chevron-up"></i>
        </div>
      )}
    </>
  );
};

export default BackToTopBtn;
