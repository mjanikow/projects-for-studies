// Row for player list
import { useTranslation } from "react-i18next";
import { isOwner, isAdmin } from "../../../helpers/authHelper";
import { Link } from "react-router-dom";

export default function PlayersListRow(props)
{
    const player = props.player;
    const { t } = useTranslation();
    const owner = isOwner(player.id);
    const admin = isAdmin();

    return (
        <tr>
            <td className="content">{player.nickname}</td>
            <td className="content">{player.isVIP ? t("bool.true") : t("bool.false")}</td>
            <td>
                <ul className="actions">
                    <li className="action"><Link to={`/players/details/${player.id}`} className="action-details">{t("actions.details")}</Link></li>
                    <li className={owner ? "action" : "action-disabled"}>{owner ? <Link to={`/players/edit/${player.id}`} className="action-edit">{t("actions.edit")}</Link> : ""}</li>
                    <li className={admin ? "action" : "action-disabled"}>{admin ? <Link to={`/players/delete/${player.id}`} className="action-delete">{t("actions.delete")}</Link> : ""}</li>
                </ul>
            </td>
        </tr>
    );
}