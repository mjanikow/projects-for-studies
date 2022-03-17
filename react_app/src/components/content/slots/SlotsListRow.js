// Row for slot list
import { useTranslation } from "react-i18next";
import { isAuth } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";

export default function SlotsListRow(props)
{
    const slot = props.slot;
    const { t } = useTranslation();
    const auth = isAuth();

    return (
        <tr>
            <td className="content"><Link to={`/players/details/${slot.playerId}`} className="link-ref">{slot.nickname}</Link></td>
            <td className="content"><Link to={`/items/details/${slot.itemId}`} className="link-ref">{slot.itemName}</Link></td>
            <td className="content">{slot.amount}</td>
            <td>
                <ul className="actions">
                    <li className="action"><Link to={`/slots/details/${slot.id}`} className="action-details">{t("actions.details")}</Link></li>
                    <li className={auth ? "action" : "action-disabled"}>{auth ? <Link to={`/slots/edit/${slot.id}`} className="action-edit">{t("actions.edit")}</Link> : ""}</li>
                    <li className={auth ? "action" : "action-disabled"}>{auth ? <Link to={`/slots/delete/${slot.id}`} className="action-delete">{t("actions.delete")}</Link> : ""}</li>
                </ul>
            </td>
        </tr>
    );
}