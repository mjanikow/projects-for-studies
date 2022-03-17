// List of all slots
import React from "react";
import { getSlots } from "../../../apiCalls/slotsApiCalls";
import SlotsListTable from "./SlotsListTable";
import { isAuth } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class SlotsList extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            slots: []
        };
    }

    fetchSlots = () => {
        getSlots().then(res => res.json()).then(data => {
            this.setState({
                isLoaded: true,
                slots: data
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
        this.fetchSlots();
    }

    render()
    {
        const { error, isLoaded, slots } = this.state;
        let content;
        const { t } = this.props;

        if (error)
        {
            content = <p className="content">{t("slots.empty")}</p>;
        }
        else if (!isLoaded)
        {
            content = <p className="content">...</p>;
        }
        else
        {
            content = <SlotsListTable slots={slots} />;
        }

        return (
            <main>
                <h2 className="content">{t("slots.headers.list")}</h2>
                {isAuth() ? <p className="list-add"><Link to="/slots/add" className="action-add">+</Link></p> : ""}
                {content}
            </main>
        );
    }
}

export default withTranslation() (SlotsList);