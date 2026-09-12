import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages, type SupportedLanguage } from "@/i18n";

const languageShortLabels: Record<SupportedLanguage, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

const languageFlags: Record<SupportedLanguage, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage = ((i18n.resolvedLanguage ?? i18n.language ?? "pt").split(
    "-",
  )[0] || "pt") as SupportedLanguage;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (language: SupportedLanguage) => {
    void i18n.changeLanguage(language);
    setOpen(false);
  };

  return (
    <div className="language-switcher" ref={containerRef}>
      <button
        type="button"
        className="language-switcher-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("common.language.label")}
        data-testid="button-language-switcher"
      >
        <span aria-hidden="true" className="language-switcher-flag">
          {languageFlags[currentLanguage] ?? languageFlags.pt}
        </span>
        <span>{languageShortLabels[currentLanguage] ?? "PT"}</span>
      </button>
      {open && (
        <ul className="language-switcher-menu" role="listbox">
          {supportedLanguages.map((language) => (
            <li key={language}>
              <button
                type="button"
                role="option"
                aria-selected={currentLanguage === language}
                className={currentLanguage === language ? "is-active" : ""}
                onClick={() => changeLanguage(language)}
                data-testid={`option-language-${language}`}
              >
                <span aria-hidden="true" className="language-switcher-flag">
                  {languageFlags[language]}
                </span>
                {t(`common.language.${language}`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
