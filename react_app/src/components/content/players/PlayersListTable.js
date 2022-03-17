// Table for player list
import { useTranslation } from "react-i18next";
import PlayersListRow from "./PlayersListRow";

export default function PlayersListTable(props)
{
    const { t } = useTranslation();

    return (
        <table>
            <thead>
                <tr>
                    <th className="table-header">{t("players.nicknameShort")}</th>
                    <th className="table-header">{t("players.isVIPShort")}</th>
                    <th className="table-header">{t("actions.title")}</th>
                </tr>
            </thead>
            <tbody>
                {props.players.map(player => <PlayersListRow player={player} key={player.id} />)}
            </tbody>
        </table>
    );
}