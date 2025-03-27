import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <a href="/">
              <img src='/assets/images/logo_wheretogo.png' width='70px' alt="logo" />
            </a>
          </div>
          <div className="footer-info">
            <p>주식회사 어디가지 | 대표 오재열</p>
            <p>사업자 등록번호 495-86-03228</p>
            <p>서울 금천구 가산디지털2로 144 현대테라타워 가산DK 20층</p>
            <p>
              <a href="mailto:contact@wheretogo.co.kr">contact@wheretogo.co.kr</a>
            </p>
          </div>
          <div className="footer-links">
            <a href="/user-agreements">이용약관</a>
            <span>|</span>
            <a href="/user-policy">개인정보처리방침</a>
            <span>|</span>
            <button>고객지원</button>
            <span>|</span>
            <a href="/inquiry">1:1 문의</a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-social">
            <button>
              <img src="/assets/images/naver_blog_icon.png" alt="Naver Blog" />
            </button>
          </div>
          <div className="footer-apps">
            <button>
              <img src="/assets/images/applestore.png" alt="App Store" />
            </button>
            <button>
              <img src="/assets/images/googlestore.png" alt="Google Play" />
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © WHERETOGO. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
