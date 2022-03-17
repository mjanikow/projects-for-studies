// Slot form fields
import { useTranslation } from "react-i18next";
import SlotOption from "./SlotOption";
import React from "react";
import { Link } from "react-router-dom";

export default function SlotFormTemplate(props)
{
    const slot = props.slot;
    const errors = props.errors;
    const { t } = useTranslation();
    const players = props.players && props.players.length > 0 ? props.players.map(player => <SlotOption value={player.id} content={player.nickname} key={player.id} />) : "";
    const items = props.items && props.items.length > 0 ? props.items.map(item => <SlotOption value={item.id} content={item.itemName} key={item.id} />) : "";

    return (
        <React.Fragment>
            <label htmlFor="Player" className="form-label">{t("slots.player")}<span className="required">*</span></label>
            <select onChange={props.onChange} name="playerId" id="Player" required disabled={props.disabled} value={slot.playerId}>
                {props.disabled ? <option value={slot.playerId} className="input-option">{slot.nickname}</option> : <option value="" className="input-option">{t("slots.selectPlayer")}</option>}
                {players}
            </select>
            {props.disabled ? <Link to={`/players/details/${slot.playerId}`} className="input-ref">{t("actions.details")}</Link> : <span id="ErrorPlayer" className="error">{errors.playerId && errors.playerId.includes(":") ? format(errors.playerId, t) : t(errors.playerId)}</span>}
            {props.disabled ? (
                <React.Fragment>
                    <label htmlFor="VIP" className="form-label">{t("players.isVIP")}</label>
                    <span id="VIP" className="content">{slot.isVIP ? t("bool.true") : t("bool.false")}</span>
                    <span id="ErrorVIP" className="error"></span>
                </React.Fragment>
            ) : ""}
            <label htmlFor="Item" className="form-label">{t("slots.item")}<span className="required">*</span></label>
            <select onChange={props.onChange} name="itemId" id="Item" required disabled={props.disabled} value={slot.itemId}>
                {props.disabled ? <option value={slot.itemId} className="input-option">{slot.itemName}</option> : <option value="" className="input-option">{t("slots.selectItem")}</option>}
                {items}
            </select>
            {props.disabled ? <Link to={`/items/details/${slot.itemId}`} className="input-ref">{t("actions.details")}</Link> : <span id="ErrorItem" className="error">{errors.itemId && errors.itemId.includes(":") ? format(errors.itemId, t) : t(errors.itemId)}</span>}
            {props.disabled ? (
                <React.Fragment>
                    <label htmlFor="Quality" className="form-label">{t("items.quality")}</label>
                    <input type="text" name="quality" id="Quality" disabled value={slot.quality} className="input-text" />
                    <span id="ErrorQuality" className="error"></span>
                </React.Fragment>
            ): ""}
            <label htmlFor="Amount" className="form-label">{t("slots.amount")}<span className="required">*</span></label>
            <input onChange={props.onChange} type="number" name="amount" id="Amount" required value={slot.amount} disabled={props.disabled} className="input-number" />
            <span id="ErrorAmount" className="error">{errors.amount && errors.amount.includes(":") ? format(errors.amount, t) : t(errors.amount)}</span>
            <label htmlFor="Event" className="form-label">{t("slots.fromEvent")}</label>
            <input onChange={props.onChange} type="text" name="fromEvent" id="Event" value={slot.fromEvent} disabled={props.disabled} className="input-text" />
            <span id="ErrorEvent" className="error">{errors.fromEvent && errors.fromEvent.includes(":") ? format(errors.fromEvent, t) : t(errors.fromEvent)}</span>
        </React.Fragment>
    );
}

function format(string, t)
{
    const text = string.split(":");
    return t(text[0]) + text[1];
}