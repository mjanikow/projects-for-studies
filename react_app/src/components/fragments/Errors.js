// Contains form errors
import { useTranslation } from "react-i18next";

export default function Errors()
{
    const { t } = useTranslation();

    return (
        <div style={{display: "none"}}>
            <span id="errRequired">{t("errors.required")}</span>
            <span id="errFormat">{t("errors.format")}</span>
            <span id="errMaxLength">{t("errors.maxLength")}</span>
            <span id="errMinValue">{t("errors.minValue")}</span>
            <span id="errOnlyFuture">{t("errors.onlyFuture")}</span>
            <span id="errSummary">{t("errors.summary")}</span>
        </div>
    );
}