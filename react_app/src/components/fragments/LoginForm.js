// Login form
import React from "react";
import { login } from "../../apiCalls/authApiCalls";
import { isAuth, isAdmin, getCurrentUser } from "../../helpers/authHelper";
import { withTranslation } from "react-i18next";

class LoginForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            player: {
                nickname: "",
                password: ""
            },
            message: null
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const player = { ...this.state.player };
        player[name] = value;

        this.setState({
            player: player
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let response;

        login(this.state.player).then(res => {
            response = res;
            return res.json();
        }).then(data => {
            if (response.status === 200 && data.token)
            {
                this.props.handleLogin(JSON.stringify(data));
            }
            else if (response.status === 401)
            {
                console.log(401);

                this.setState({
                    message: data.message
                });
            }
        }, error => {
            console.log(error);
        });
    };

    handleLogout = () => {
        this.setState({
            player: {
                nickname: "",
                password: ""
            },
            message: null
        });

        this.props.handleLogout();
    };

    render()
    {
        const { t } = this.props;
        const player = getCurrentUser();
        let content;

        if (isAuth())
        {
            content = (
                <React.Fragment>
                    <span className={isAdmin() ? "login-data-admin" : "login-data"}>{t("auth.logged") + player.nickname}</span>
                    <button onClick={this.handleLogout} className="logout-link">{t("auth.logout")}</button>
                </React.Fragment>
            );
        }
        else
        {
            content = (
                <form noValidate onSubmit={this.handleSubmit}>
                    <label htmlFor="Login" className="form-label">{t("players.nickname")}</label>
                    <input onChange={this.handleChange} type="text" name="nickname" id="Login" className="input-text" />
                    <span className="error"></span>
                    <label htmlFor="Password" className="form-label">{t("players.password")}</label>
                    <input onChange={this.handleChange} type="text" name="password" id="Password" className="input-text" />
                    <span className="error"></span>
                    <span id="ErrorLogin" className="error-summary">{this.state.message ? t(this.state.message) : ""}</span>
                    <input type="submit" value={t("auth.login")} className="input-submit" />
                </form>
            );
        }

        return (
            <div className="login-area">
                {content}
            </div>
        );
    }
}

export default withTranslation() (LoginForm);