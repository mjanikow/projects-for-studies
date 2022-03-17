// Item edition form
import React from "react";
import { getItemById, addItem, updateItem } from "../../../apiCalls/itemsApiCalls";
import validateItemForm from "../../../helpers/validationItemForm";
import { Navigate as Redirect } from "react-router-dom";
import ItemFormTemplate from "./ItemFormTemplate";
import { Link } from "react-router-dom";
import Errors from "../../fragments/Errors";
import { withTranslation } from "react-i18next";
import withParams from "../../../helpers/withParams";

class ItemForm extends React.Component
{
    constructor(props)
    {
        super(props);
        const { itemId } = props.params;

        this.state = {
            itemId: itemId,
            item: {
                itemName: "",
                quality: ""
            },
            errors: {
                itemName: "",
                quality: ""
            },
            isNew: !itemId,
            isLoaded: false,
            redirect: false,
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
                delete data.owners;

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
        if (this.state.isNew)
        {
            this.setState({
                isLoaded: true
            });
        }
        else
        {
            this.fetchItemDetails();
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const item = { ...this.state.item };
        item[name] = value;

        this.setState({
            item: item
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            errors: {
                itemName: "",
                quality: ""
            }
        });

        if (!validateItemForm())
        {
            return;
        }

        const item = this.state.item;
        let promise;
        console.log(item);

        if (this.state.isNew)
        {
            promise = addItem(item);
        }
        else
        {
            promise = updateItem(this.state.itemId, item);
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
        const { item, redirect, isNew, errors, isLoaded, message } = this.state;
        const { t } = this.props;

        if (redirect)
        {
            return <Redirect replace to={{pathname: "/items"}} />;
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
                    <input type="hidden" name="id" value={item.id} />
                    <ItemFormTemplate onChange={this.handleChange} item={item} disabled={false} errors={errors} />
                    <span id="ErrorSummary" className="error-summary"></span>
                    <input type="submit" value={isNew ? t("items.add") : t("items.edit")} className="input-submit" />
                    <Link to="/items" className="input-cancel">{t("actions.cancel")}</Link>
                </form>
            );
        }

        return (
            <main>
                <Errors />
                <h2 className="content">{isNew ? t("items.headers.add") : t("items.headers.edit")}</h2>
                {content}
            </main>
        );
    }
}

export default withTranslation() (withParams(ItemForm));