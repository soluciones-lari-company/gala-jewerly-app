const Footer = () => {
  return (
    <footer className="bg-dark pb-0 text-white mt-3">
      <div className="container">
        <div className="row justify-content-md-between gutter-2">
          <div className="order-1 col-md-8 col-lg-4">
            <div className="row">
              <div className="col">
                <h4 className="eyebrow mb-1">Company</h4>
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <a href="" className="menu-list-link">
                      Our story
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h4 className="eyebrow mb-1">Help Center</h4>
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <a href="" className="menu-list-link">
                      Shipping
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
