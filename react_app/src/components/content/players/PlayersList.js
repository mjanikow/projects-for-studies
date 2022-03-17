// List of all players
import React from "react";
import { getPlayers } from "../../../apiCalls/playersApiCalls";
import PlayersListTable from "./PlayersListTable";
import { isAdmin } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class PlayersList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            players: []
        };
    }

    fetchPlayers = () => {
        getPlayers().then(res => res.json()).then(data => {
            this.setState({
                isLoaded: true,
                players: data
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    };

    componentDidMount()
    {
        this.fetchPlayers();
    }

    render()
    {
        const { error, isLoaded, players } = this.state;
        let content;
        const { t } = this.props;

        if (error)
        {
            content = <p className="content">{t("players.empty")}</p>;
        }
        else if (!isLoaded)
        {
            content = <p className="content">...</p>;
        }
        else
        {
            content = <PlayersListTable players={players} />;
        }

        return (
            <main>
                <h2 className="content">{t("players.headers.list")}</h2>
                {isAdmin() ? <p className="list-add"><Link to="/players/add" className="action-add">+</Link></p> : ""}
                {content}
            </main>
        );
    }
}

export default withTranslation() (PlayersList);