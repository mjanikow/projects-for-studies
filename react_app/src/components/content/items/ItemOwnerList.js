// Table for item owners
import { useTranslation } from "react-i18next";
import OwnerData from "./OwnerData";

export default function ItemOwnerList(props)
{
    const { t } = useTranslation();

    return (
        <table>
            <thead>
                <tr>
                    <th className="table-header">{t("items.player")}</th>
                    <th className="table-header">{t("players.isVIPShort")}</th>
                    <th className="table-header">{t("slots.amountShort")}</th>
                </tr>
            </thead>
            <tbody>
                {props.owners.map(owner => <OwnerData owner={owner} key={owner.id} />)}
            </tbody>
        </table>
    );
}