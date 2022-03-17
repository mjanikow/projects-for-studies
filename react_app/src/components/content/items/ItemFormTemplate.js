// Item form fields
import { useTranslation } from "react-i18next";
import React from "react";

export default function ItemFormTemplate(props)
{
    const item = props.item;
    const errors = props.errors;
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <label htmlFor="Name" className="form-label">{t("items.itemName")}<span className="required">*</span></label>
            <input onChange={props.onChange} type="text" name="itemName" id="Name" required value={item.itemName} disabled={props.disabled} className="input-text" />
            <span id="ErrorName" className="error">{errors.itemName && errors.itemName.includes(":") ? format(errors.itemName, t) : t(errors.itemName)}</span>
            <label htmlFor="Quality" className="form-label">{t("items.quality")}<span className="required">*</span></label>
            <input onChange={props.onChange} type="text" name="quality" id="Quality" required value={item.quality} disabled={props.disabled} className="input-text" />
            <span id="ErrorQuality" className="error">{errors.quality && errors.quality.includes(":") ? format(errors.quality, t) : t(errors.quality)}</span>
        </React.Fragment>
    );
}

function format(string, t)
{
    const text = string.split(":");
    return t(text[0]) + text[1];
}