// Row for item list
import { useTranslation } from "react-i18next";
import { isAdmin } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";

export default function ItemsListRow(props)
{
    const item = props.item;
    const { t } = useTranslation();
    const admin = isAdmin();

    return (
        <tr>
            <td className="content">{item.itemName}</td>
            <td className="content">{item.quality}</td>
            <td>
                <ul className="actions">
                    <li className="action"><Link to={`/items/details/${item.id}`} className="action-details">{t("actions.details")}</Link></li>
                    <li className={admin ? "action" : "action-disabled"}>{admin ? <Link to={`/items/edit/${item.id}`} className="action-edit">{t("actions.edit")}</Link> : ""}</li>
                    <li className={admin ? "action" : "action-disabled"}>{admin ? <Link to={`/items/delete/${item.id}`} className="action-delete">{t("actions.delete")}</Link> : ""}</li>
                </ul>
            </td>
        </tr>
    );
}