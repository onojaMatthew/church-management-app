import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <span className="navbar-brand">Hidden brand</span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link active" aria-current="page">Home</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Link</span>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled" tabindex="-1" aria-disabled="true">Disabled</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;


