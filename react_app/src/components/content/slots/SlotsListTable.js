// Table for slot list
import { useTranslation } from "react-i18next";
import SlotsListRow from "./SlotsListRow";

export default function SlotsListTable(props)
{
    const { t } = useTranslation();

    return (
        <table>
            <thead>
                <tr>
                    <th className="table-header">{t("slots.playerShort")}</th>
                    <th className="table-header">{t("slots.itemShort")}</th>
                    <th className="table-header">{t("slots.amountShort")}</th>
                    <th className="table-header">{t("actions.title")}</th>
                </tr>
            </thead>
            <tbody>
                {props.slots.map(slot => <SlotsListRow slot={slot} key={slot.id} />)}
            </tbody>
        </table>
    );
}