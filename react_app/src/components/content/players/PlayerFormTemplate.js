// Player form fields
import { useTranslation } from "react-i18next";
import React from "react";

export default function PlayerFormTemplate(props)
{
    const player = props.player;
    const errors = props.errors;
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <label htmlFor="Nickname" className="form-label">{t("players.nickname")}<span className="required">*</span></label>
            <input onChange={props.onChange} type="text" name="nickname" id="Nickname" required value={player.nickname} disabled={props.disabled} className="input-text" />
            <span id="ErrorNickname" className="error">{errors.nickname && errors.nickname.includes(":") ? format(errors.nickname, t) : t(errors.nickname)}</span>
            <label htmlFor="IsVIP" className="form-label">{t("players.isVIP")}<span className="required">*</span></label>
            {props.disabled ? <span id="IsVIP" className="content">{player.isVIP ? t("bool.true") : t("bool.false")}</span> : <input onChange={props.onChange} type="checkbox" name="isVIP" id="IsVIP" required checked={player.isVIP} disabled={!props.admin} className="input-checkbox" />}
            <span id="ErrorVIP" className="error">{errors.isVIP && errors.isVIP.includes(":") ? format(errors.isVIP, t) : t(errors.isVIP)}</span>
            <label htmlFor="TradeBan" className="form-label">{t("players.tradeBan")}</label>
            <input onChange={props.onChange} type="datetime-local" name="tradeBan" id="TradeBan" value={player.tradeBan ? player.tradeBan.toString().slice(0, 16) : ""} disabled={props.disabled || !props.admin} className="input-date" />
            <span id="ErrorTradeBan" className="error">{errors.tradeBan && errors.tradeBan.includes(":") ? format(errors.tradeBan, t) : t(errors.tradeBan)}</span>
        </React.Fragment>
    );
}

function format(string, t)
{
    const text = string.split(":");
    return t(text[0]) + text[1];
}