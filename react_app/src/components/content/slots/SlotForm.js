// Slot edition form
import React from "react";
import { getSlotById, addSlot, updateSlot } from "../../../apiCalls/slotsApiCalls";
import { getPlayers } from "../../../apiCalls/playersApiCalls";
import { getItems } from "../../../apiCalls/itemsApiCalls";
import validateSlotForm from "../../../helpers/validationSlotForm";
import { Navigate as Redirect } from "react-router-dom";
import SlotFormTemplate from "./SlotFormTemplate";
import { Link } from "react-router-dom";
import Errors from "../../fragments/Errors";
import { withTranslation } from "react-i18next";
import withParams from "../../../helpers/withParams";

class SlotForm extends React.Component
{
    constructor(props)
    {
        super(props);
        const { slotId } = props.params;

        this.state = {
            slotId: slotId,
            slot: {
                playerId: "",
                itemId: "",
                amount: "",
                fromEvent: ""
            },
            errors: {
                playerId: "",
                itemId: "",
                amount: "",
                fromEvent: ""
            },
            isNew: !slotId,
            isLoaded: false,
            redirect: false,
            message: null,
            players: [],
            items: []
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
                delete data.nickname;
                delete data.isVIP;
                delete data.itemName;
                delete data.quality;

                this.setState({
                    slot: data
                });
            }
        }, (error) => {
            this.setState({
                message: error.message
            });
        });
    };

    fetchData = () => {
        let tmp;

        getPlayers().then(res => res.json()).then(data => {
            tmp = data;
            return getItems();
        }).then(res => res.json()).then(data => {
            this.setState({
                players: tmp,
                items: data,
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
        if (!this.state.isNew)
        {
            this.fetchSlotDetails();
        }

        this.fetchData();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const slot = { ...this.state.slot };
        slot[name] = value;

        this.setState({
            slot: slot
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            errors: {
                playerId: "",
                itemId: "",
                amount: "",
                fromEvent: ""
            }
        });

        if (!validateSlotForm())
        {
            return;
        }

        const slot = this.state.slot;
        let promise;
        console.log(slot);

        if (this.state.isNew)
        {
            promise = addSlot(slot);
        }
        else
        {
            promise = updateSlot(this.state.slotId, slot);
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
        const { slot, redirect, isNew, errors, isLoaded, message, players, items } = this.state;
        const { t } = this.props;

        if (redirect)
        {
            return <Redirect replace to={{pathname: "/slots"}} />;
        }

        let content;

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
                <form noValidate onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={slot.id} />
                    <SlotFormTemplate onChange={this.handleChange} slot={slot} players={players} items={items} disabled={false} errors={errors} />
                    <span id="ErrorSummary" className="error-summary"></span>
                    <input type="submit" value={isNew ? t("slots.add") : t("slots.edit")} className="input-submit" />
                    <Link to="/slots" className="input-cancel">{t("actions.cancel")}</Link>
                </form>
            );
        }

        return (
            <main>
                <Errors />
                <h2 className="content">{isNew ? t("slots.headers.add") : t("slots.headers.edit")}</h2>
                {content}
            </main>
        );
    }
}

export default withTranslation() (withParams(SlotForm));