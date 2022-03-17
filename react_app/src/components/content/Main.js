// Home page
import { useTranslation } from "react-i18next";

export default function Main()
{
    const { t } = useTranslation();

    return (
        <main>
            <h2 className="content">{t("main.header")}</h2>
            <p className="content">{t("main.content")}</p>
        </main>
    );
}