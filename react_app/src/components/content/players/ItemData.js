// Item data display
import { Link } from "react-router-dom";

export default function ItemData(props)
{
    const item = props.item;

    return (
        <tr>
            <td className="content"><Link to={`/items/details/${item.id}`} className="link-ref">{item.itemName}</Link></td>
            <td className="content">{item.quality}</td>
            <td className="content">{item.amount}</td>
        </tr>
    );
}