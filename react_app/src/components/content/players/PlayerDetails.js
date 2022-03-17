// Player details display
import React from "react";
import { getPlayerById } from "../../../apiCalls/playersApiCalls";
import PlayerFormTemplate from "./PlayerFormTemplate";
import { isOwner, isAdmin } from "../../../helpers/authHelper";
import PlayerItemList from "./PlayerItemList";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withParams from "../../../helpers/withParams";

class PlayerDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        const { playerId } = props.params;

        this.state = {
            playerId: playerId,
            player: null,
            isLoaded: false,
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
        this.fetchPlayerDetails();
    }

    render()
    {
        const { player, isLoaded, message } = this.state;
        let content, items;
        const { t } = this.props;

        if (message && message.includes(":"))
        {
            const text = message.split(":");
            content = <p className="content">{t(text[0]) + text[1]}</p>;
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
                <form>
                    <PlayerFormTemplate player={player} disabled={true} admin={isAdmin()} errors={{}} />
                    {isOwner(player.id) ? <Link to={`/players/edit/${player.id}`} className="input-edit">{t("actions.edit")}</Link> : ""}
                </form>
            );
        }

        if (player && player.items && player.items.length > 0)
        {
            items = <PlayerItemList items={player.items} />;
        }
        else
        {
            items = <p className="content">{t("players.items")}</p>;
        }

        return (
            <main>
                <h2 className="content">{t("players.headers.details")}</h2>
                {content}
                <h2 className="content">{t("players.headers.items")}</h2>
                {items}
                <p><Link to="/players" className="action-return">{t("actions.return")}</Link></p>
            </main>
        );
    }
}

export default withTranslation() (withParams(PlayerDetails));