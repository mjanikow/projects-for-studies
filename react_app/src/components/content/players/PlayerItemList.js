// Table for player items
import { useTranslation } from "react-i18next";
import ItemData from "./ItemData";

export default function PlayerItemList(props)
{
    const { t } = useTranslation();

    return (
        <table>
            <thead>
                <tr>
                    <th className="table-header">{t("players.item")}</th>
                    <th className="table-header">{t("items.qualityShort")}</th>
                    <th className="table-header">{t("slots.amountShort")}</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => <ItemData item={item} key={item.id} />)}
            </tbody>
        </table>
    );
}