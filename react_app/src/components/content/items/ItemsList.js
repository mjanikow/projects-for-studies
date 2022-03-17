// List of all items
import React from "react";
import { getItems } from "../../../apiCalls/itemsApiCalls";
import ItemsListTable from "./ItemsListTable";
import { isAdmin } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class ItemsList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    fetchItems = () => {
        getItems().then(res => res.json()).then(data => {
            this.setState({
                isLoaded: true,
                items: data
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
        this.fetchItems();
    }

    render()
    {
        const { error, isLoaded, items } = this.state;
        let content;
        const { t } = this.props;

        if (error)
        {
            content = <p className="content">{t("items.empty")}</p>;
        }
        else if (!isLoaded)
        {
            content = <p className="content">...</p>;
        }
        else
        {
            content = <ItemsListTable items={items} />;
        }

        return (
            <main>
                <h2 className="content">{t("items.headers.list")}</h2>
                {isAdmin() ? <p className="list-add"><Link to="/items/add" className="action-add">+</Link></p> : ""}
                {content}
            </main>
        );
    }
}

export default withTranslation() (ItemsList);