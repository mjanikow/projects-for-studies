// Deletes the item
import React from "react";
import { deleteItem } from "../../../apiCalls/itemsApiCalls";
import { Navigate as Redirect } from "react-router-dom";
import withParams from "../../../helpers/withParams";

class DeleteItem extends React.Component
{
    constructor(props)
    {
        super(props);
        const { itemId } = props.params;

        this.state = {
            itemId: itemId,
            finished: false
        };
    }

    componentDidMount()
    {
        deleteItem(this.state.itemId).then(res => {
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
                {this.state.finished ? <Redirect replace to={{pathname: "/items"}} /> : ""}
            </main>
        );
    }
}

export default withParams(DeleteItem);