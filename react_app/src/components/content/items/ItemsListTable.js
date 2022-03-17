// Table for item list
import { useTranslation } from "react-i18next";
import ItemsListRow from "./ItemsListRow";

export default function ItemsListTable(props)
{
    const { t } = useTranslation();

    return (
        <table>
            <thead>
                <tr>
                    <th className="table-header">{t("items.itemNameShort")}</th>
                    <th className="table-header">{t("items.qualityShort")}</th>
                    <th className="table-header">{t("actions.title")}</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => <ItemsListRow item={item} key={item.id} />)}
            </tbody>
        </table>
    );
}