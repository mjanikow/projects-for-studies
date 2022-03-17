// Owner data display
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function OwnerData(props)
{
    const owner = props.owner;
    const { t } = useTranslation();

    return (
        <tr>
            <td className="content"><Link to={`/players/details/${owner.id}`} className="link-ref">{owner.nickname}</Link></td>
            <td className="content">{owner.isVIP ? t("bool.true") : t("bool.false")}</td>
            <td className="content">{owner.amount}</td>
        </tr>
    );
}