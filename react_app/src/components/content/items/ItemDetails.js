// Item details display
import React from "react";
import { getItemById } from "../../../apiCalls/itemsApiCalls";
import ItemFormTemplate from "./ItemFormTemplate";
import { isAdmin } from "../../../helpers/authHelper";
import ItemOwnerList from "./ItemOwnerList";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withParams from "../../../helpers/withParams";

class ItemDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        const { itemId } = props.params;

        this.state = {
            itemId: itemId,
            item: null,
            isLoaded: false,
            message: null
        };
    }

    fetchItemDetails = () => {
        getItemById(this.state.itemId).then(res => res.json()).then(data => {
            if (data.message)
            {
                this.setState({
                    message: data.message
                });
            }
            else
            {
                this.setState({
                    item: data
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
        this.fetchItemDetails();
    }

    render()
    {
        const { item, isLoaded, message } = this.state;
        let content, owners;
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
                    <ItemFormTemplate item={item} disabled={true} errors={{}} />
                    {isAdmin() ? <Link to={`/items/edit/${item.id}`} className="input-edit">{t("actions.edit")}</Link> : ""}
                </form>
            );
        }

        if (item && item.owners && item.owners.length > 0)
        {
            owners = <ItemOwnerList owners={item.owners} />;
        }
        else
        {
            owners = <p className="content">{t("items.owners")}</p>;
        }

        return (
            <main>
                <h2 className="content">{t("players.headers.details")}</h2>
                {content}
                <h2 className="content">{t("players.headers.items")}</h2>
                {owners}
                <p><Link to="/players" className="action-return">{t("actions.return")}</Link></p>
            </main>
        );
    }
}

export default withTranslation() (withParams(ItemDetails));