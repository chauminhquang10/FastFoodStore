import React, { useContext } from "react";
import Button from "../headers/Button";
import "./Footer.css";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const Footer = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <>
          <p className="footer-subscription-heading">
            Tham gia cộng đồng Nông Sản Sạch!
          </p>
          <p className="footer-subscription-text">
            Bạn có thể đăng kí bất kì lúc nào
          </p>
        </>
        <div>
          <form style={{ position: "relative" }}>
            <input
              className="footer-input"
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
            ></input>
            <Button buttonStyle="btn--outline">Đăng kí</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Về Chúng Tôi</h2>
            <Link to="">Tổ chức</Link>
            <Link to="/">Chứng thực</Link>
          </div>
          <div class="footer-link-items">
            <h2>Liên Hệ</h2>
            <Link to="/">Email</Link>
            <Link to="/">Hỗ trợ</Link>
          </div>
          <div class="footer-link-items">
            <h2>Video</h2>
            <Link to="/">Video</Link>
            <Link to="/">Chi nhánh</Link>
          </div>
          <div class="footer-link-items">
            <h2>Mạng Xã Hội</h2>
            <Link to="/">Instagram</Link>
            <Link to="/">Facebook</Link>
            <Link to="/">Youtube</Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              MAMMAM <i className="fab fa-typo3"></i>
            </Link>
          </div>
          <small className="website-rights">MAMMAM &copy; 2021 </small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              arial-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              arial-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link
              class="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i class="fab fa-youtube" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter" />
            </Link>
            <Link
              class="social-icon-link linkedin"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
