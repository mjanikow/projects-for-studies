// Deletes the slot
import React from "react";
import { deleteSlot } from "../../../apiCalls/slotsApiCalls";
import { Navigate as Redirect } from "react-router-dom";
import withParams from "../../../helpers/withParams";

class DeleteSlot extends React.Component
{
    constructor(props)
    {
        super(props);
        const { slotId } = props.params;

        this.state = {
            slotId: slotId,
            finished: false
        };
    }

    componentDidMount()
    {
        deleteSlot(this.state.slotId).then(res => {
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
                {this.state.finished ? <Redirect replace to={{pathname: "/slots"}} /> : ""}
            </main>
        );
    }
}

export default withParams(DeleteSlot);