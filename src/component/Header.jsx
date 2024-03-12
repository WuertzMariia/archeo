// eslint-disable-next-line no-unused-vars
import React from "react";
import {Link} from "react-router-dom";

const Header = () => (
    <header className="header-main">
        <div className="header-logo">
            <h2>AutoMeshCraft</h2>
        </div>
        <div className="navigation-main">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/">Anleitung</Link>
                <Link to="/">Projekt</Link>
                <Link to="/">Kontakt</Link>
            </nav>
            <div>
                <Link to="/account">
                    <span className="material-symbols-outlined">deployed_code_account</span>
                </Link>
            </div>
        </div>
    </header>
);

export default Header;