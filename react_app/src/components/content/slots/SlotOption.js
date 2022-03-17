// Slot form option
export default function SlotOption(props)
{
    return <option value={props.value} className="input-option">{props.content}</option>;
}