// Player edition form
import React from "react";
import { getPlayerById, addPlayer, updatePlayer } from "../../../apiCalls/playersApiCalls";
import validatePlayerForm from "../../../helpers/validationPlayerForm";
import { Navigate as Redirect } from "react-router-dom";
import PlayerFormTemplate from "./PlayerFormTemplate";
import { isAdmin } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";
import Errors from "../../fragments/Errors";
import { withTranslation } from "react-i18next";
import withParams from "../../../helpers/withParams";

class PlayerForm extends React.Component
{
    constructor(props)
    {
        super(props);
        const { playerId } = props.params;

        this.state = {
            playerId: playerId,
            player: {
                nickname: "",
                isVIP: false,
                tradeBan: "",
                password: "",
                changePassword: false
            },
            errors: {
                nickname: "",
                isVIP: "",
                tradeBan: "",
                password: ""
            },
            isNew: !playerId,
            isLoaded: false,
            redirect: false,
            message: null
        };
    }

    fetchPlayerDetails = () => {
        getPlayerById(this.state.playerId).then(res => res.json()).then(data => {
            if (data.message)
            {
                this.setState({
                    message: data.message
                });
            }
            else
            {
                delete data.items;
                data.tradeBan = data.tradeBan ? data.tradeBan.toString().slice(0, 16) : "";

                this.setState({
                    player: data
                });
            }

            this.setState({
                isLoaded: true
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                message: error.message
            });
        });
    };

    componentDidMount()
    {
        if (this.state.isNew)
        {
            this.setState({
                isLoaded: true
            });
        }
        else
        {
            this.fetchPlayerDetails();
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const player = { ...this.state.player };

        if (name === "isVIP")
        {
            player.isVIP = !player.isVIP;
        }
        else if (name === "tradeBan")
        {
            player.tradeBan = value ? value.toString().slice(0, 16) : "";
        }
        else if (name === "changePassword")
        {
            player.changePassword = !player.changePassword;
        }
        else
        {
            player[name] = value;
        }

        this.setState({
            player: player
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            errors: {
                nickname: "",
                isVIP: "",
                tradeBan: "",
                password: ""
            }
        });

        if (!validatePlayerForm())
        {
            return;
        }

        const player = this.state.player;
        let promise;
        console.log(player);

        if (this.state.isNew)
        {
            promise = addPlayer(player);
        }
        else
        {
            promise = updatePlayer(this.state.playerId, player);
        }

        promise.then(res => res.json()).then(data => {
            if (data.details && data.details.length > 0)
            {
                console.log(data);

                for (const i in data.details)
                {
                    const errors = { ...this.state.errors };
                    const name = data.details[i].path;
                    const value = data.details[i].message;
                    errors[name] = value;

                    this.setState({
                        errors
                    });
                }

                console.log(this.state.errors);
            }
            else
            {
                this.setState({
                    redirect: true
                });
            }
        }, error => {
            console.log(error);
        });
    };

    render()
    {
        const { player, redirect, isNew, errors, isLoaded, message } = this.state;
        const { t } = this.props;

        if (isNew)
        {
            delete player.changePassword;
        }

        if (redirect)
        {
            return <Redirect replace to={{pathname: "/players"}} />;
        }

        let content;

        if (message && message.includes(":"))
        {
            content = <p className="content">{format(message, t)}</p>;
        }
        else if (message)
        {
            content = <p className="content">{message}</p>;
        }
        else if (!isLoaded)
        {
            content = <p className="content">...</p>;
        }
        else
        {
            content = (
                <form noValidate onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={player.id} />
                    <PlayerFormTemplate onChange={this.handleChange} player={player} admin={isAdmin()} disabled={false} errors={errors} />
                    <label htmlFor="Pass" className="form-label">{t("players.password")}</label>
                    <input onChange={this.handleChange} type="text" name="password" id="Pass" className="input-text" />
                    <span id="ErrorPass" className="error">{errors.password && errors.password.includes(":") ? format(errors.password, t) : t(errors.password)}</span>
                    {!isNew ? (
                        <React.Fragment>
                            <label htmlFor="ChangePass" className="form-label">{t("players.change")}</label>
                            <input onChange={this.handleChange} type="checkbox" name="changePassword" id="ChangePass" className="input-checkbox" />
                            <span className="error"></span>
                        </React.Fragment>
                    ) : ""}
                    <span id="ErrorSummary" className="error-summary"></span>
                    <input type="submit" value={isNew ? t("players.add") : t("players.edit")} className="input-submit" />
                    <Link to="/players" className="input-cancel">{t("actions.cancel")}</Link>
                </form>
            );
        }

        return (
            <main>
                <Errors />
                <h2 className="content">{isNew ? t("players.headers.add") : t("players.headers.edit")}</h2>
                {content}
            </main>
        );
    }
}

function format(string, t)
{
    const text = string.split(":");
    return t(text[0]) + text[1];
}

export default withTranslation() (withParams(PlayerForm));