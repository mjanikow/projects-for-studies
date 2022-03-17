// Deletes the player
import React from "react";
import { deletePlayer } from "../../../apiCalls/playersApiCalls";
import { Navigate as Redirect } from "react-router-dom";
import withParams from "../../../helpers/withParams";

class DeletePlayer extends React.Component
{
    constructor(props)
    {
        super(props);
        const { playerId } = props.params;

        this.state = {
            playerId: playerId,
            finished: false
        };
    }

    componentDidMount()
    {
        deletePlayer(this.state.playerId).then(res => {
            this.setState({
                finished: true
            });
        }).catch(error => {
            this.setState({
                finished: true
            });
        });
    }

    render()
    {
        return (
            <main>
                {this.state.finished ? <Redirect replace to={{pathname: "/players"}} /> : ""}
            </main>
        );
    }
}

export default withParams(DeletePlayer);