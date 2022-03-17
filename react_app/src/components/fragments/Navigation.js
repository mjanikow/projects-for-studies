// Page navigation menu
import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class Navigation extends React.Component
{
    handleLangChange = (lang) => {
        const { i18n } = this.props;

        i18n.changeLanguage(lang, (err, t) => {
            if (err)
            {
                return console.log("Something went wrong when loading new language", err);
            }
        });
    };

    render()
    {
        const { t } = this.props;

        return (
            <nav>
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/" className="nav-link">{t("nav.main")}</Link></li>
                    <li className="nav-item"><Link to="/players" className="nav-link">{t("nav.player")}</Link></li>
                    <li className="nav-item"><Link to="/items" className="nav-link">{t("nav.item")}</Link></li>
                    <li className="nav-item"><Link to="/slots" className="nav-link">{t("nav.slot")}</Link></li>
                </ul>
                <ul className="lang-list">
                    <li className="lang-item"><button onClick={() => this.handleLangChange("pl")} className="lang-link">PL</button></li>
                    <li className="lang-item"><button onClick={() => this.handleLangChange("en")} className="lang-link">EN</button></li>
                </ul>
            </nav>
        );
    }
}

export default withTranslation() (Navigation);