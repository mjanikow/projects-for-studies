// Slot details display
import React from "react";
import { getSlotById } from "../../../apiCalls/slotsApiCalls";
import SlotFormTemplate from "./SlotFormTemplate";
import { isAuth } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withParams from "../../../helpers/withParams";

class SlotDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        const { slotId } = props.params;

        this.state = {
            slotId: slotId,
            slot: null,
            isLoaded: false,
            message: null
        };
    }

    fetchSlotDetails = () => {
        getSlotById(this.state.slotId).then(res => res.json()).then(data => {
            if (data.message)
            {
                this.setState({
                    message: data.message
                });
            }
            else
            {
                this.setState({
                    slot: data
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
        this.fetchSlotDetails();
    }

    render()
    {
        const { slot, isLoaded, message } = this.state;
        let content;
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
                    <SlotFormTemplate slot={slot} players={[]} items={[]} disabled={true} errors={{}} />
                    {isAuth() ? <Link to={`/slots/edit/${slot.id}`} className="input-edit">{t("actions.edit")}</Link> : ""}
                </form>
            );
        }

        return (
            <main>
                <h2 className="content">{t("slots.headers.details")}</h2>
                {content}
                <p><Link to="/slots" className="action-return">{t("actions.return")}</Link></p>
            </main>
        );
    }
}

export default withTranslation() (withParams(SlotDetails));