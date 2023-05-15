import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logodark from "../../assets/images/logo/png_1-removebg-preview.png";
import logofooter from "../../assets/images/logo/png_1-removebg-preview.png";
const Footer = () => {
  const resourcesList = [
    {
      title: "White Paper",
      link: "#",
    },
    {
      title: "NFT MarketPlace",
      link: "#",
    },
  ];

  const socialList = [
    {
      icon: "fab fa-twitter",
      link: "https://twitter.com/zkzerosea",
    },
    {
      icon: "fab fa-telegram-plane",
      link: "https://t.me/ZkZeroSea",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-12">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link to="/">
                    <img
                      className="logo-dark"
                      style={{
                        height: 72,
                      }}
                      src={logodark}
                      alt="nft-gaming"
                    />
                    <img
                      className="logo-light"
                      style={{
                        height: 72,
                      }}
                      src={logofooter}
                      alt="nft-gaming"
                    />
                  </Link>
                </div>
                <p className="sub-widget-logo">$PEPESUPER Pro©Copyright 2023</p>
              </div>
            </div>

            <div className=" col-md-4  col-12">
              <div className="widget widget-menu fl-st-3">
                <h3 className="title-widget">PEPE Super Grow</h3>
                <ul style={{ color: "white" }}>
                  {resourcesList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>
                        <p>{item.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6  col-12">
              <div className="widget widget-subcribe">
                <h3 className="title-widget">Join Newsletter</h3>
                <div className="form-subcribe">
                  <form
                    id="subscribe-form"
                    action="#"
                    method="GET"
                    acceptCharset="utf-8"
                    className="form-submit"
                  >
                    <input
                      name="email"
                      className="email"
                      type="email"
                      placeholder="your@mail.com"
                      required
                    />
                    <button id="submit" name="submit" type="submit">
                      <i className="icon-fl-send"></i>
                    </button>
                  </form>
                </div>
                <div className="widget-social style-1 mg-t32">
                  <ul>
                    {socialList.map((item, index) => (
                      <li key={index}>
                        <a href={item.link} target="_blank">
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
