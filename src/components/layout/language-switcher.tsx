import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages, type SupportedLanguage } from "@/i18n";

const languageShortLabels: Record<SupportedLanguage, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

function FlagBR() {
  return (
    <svg
      viewBox="0 0 640 480"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fillRule="evenodd" strokeWidth="0">
        <path fill="#009b3a" d="M0 0h640v480H0z" />
        <path fill="#fedf00" d="M320 48 592 240 320 432 48 240z" />
        <circle cx="320" cy="240" r="105" fill="#002776" />
        <clipPath id="br-circle-mask">
          <circle cx="320" cy="240" r="105" />
        </clipPath>
        <g clipPath="url(#br-circle-mask)">
          <path
            fill="#ffffff"
            d="M170 270 C 235 220, 390 195, 470 230 L 475 252 C 390 215, 235 242, 165 292 Z"
          />
          <circle cx="350" cy="195" r="3.5" fill="#ffffff" />
          <circle cx="320" cy="280" r="4.2" fill="#ffffff" />
          <circle cx="320" cy="262" r="3.2" fill="#ffffff" />
          <circle cx="308" cy="272" r="3.2" fill="#ffffff" />
          <circle cx="332" cy="272" r="3.2" fill="#ffffff" />
          <circle cx="325" cy="292" r="2.5" fill="#ffffff" />
          <circle cx="280" cy="270" r="3" fill="#ffffff" />
          <circle cx="360" cy="270" r="3" fill="#ffffff" />
          <circle cx="295" cy="295" r="2.8" fill="#ffffff" />
          <circle cx="345" cy="290" r="2.8" fill="#ffffff" />
        </g>
      </g>
    </svg>
  );
}

function FlagUS() {
  return (
    <svg
      viewBox="0 0 640 480"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="640" height="480" fill="#bd3d44" />
      <path
        stroke="#ffffff"
        strokeWidth="36.92"
        d="M0 55.38h640M0 129.23h640M0 203.07h640M0 276.92h640M0 350.77h640M0 424.61h640"
      />
      <rect width="260" height="258.46" fill="#192f5d" />
      <g fill="#ffffff">
        {[
          [28, 25], [74, 25], [120, 25], [166, 25], [212, 25], [236, 25],
          [51, 48], [97, 48], [143, 48], [189, 48],
          [28, 71], [74, 71], [120, 71], [166, 71], [212, 71], [236, 71],
          [51, 94], [97, 94], [143, 94], [189, 94],
          [28, 117], [74, 117], [120, 117], [166, 117], [212, 117], [236, 117],
          [51, 140], [97, 140], [143, 140], [189, 140],
          [28, 163], [74, 163], [120, 163], [166, 163], [212, 163], [236, 163],
          [51, 186], [97, 186], [143, 186], [189, 186],
          [28, 209], [74, 209], [120, 209], [166, 209], [212, 209], [236, 209],
          [51, 232], [97, 232], [143, 232], [189, 232],
        ].map(([cx, cy], i) => (
          <polygon
            key={i}
            points={`${cx},${cy - 6.5} ${cx + 2},${cy - 2} ${cx + 6.5},${cy - 2} ${cx + 3},${cy + 1.5} ${cx + 4.5},${cy + 6} ${cx},${cy + 3} ${cx - 4.5},${cy + 6} ${cx - 3},${cy + 1.5} ${cx - 6.5},${cy - 2} ${cx - 2},${cy - 2}`}
          />
        ))}
      </g>
    </svg>
  );
}

function FlagES() {
  return (
    <svg
      viewBox="0 0 640 480"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="640" height="480" fill="#c60b1e" />
      <rect y="120" width="640" height="240" fill="#ffc400" />
      <g transform="translate(135, 175) scale(0.9)">
        <path
          d="M 15 15 L 20 28 L 50 28 L 55 15 L 44 22 L 35 12 L 26 22 Z"
          fill="#c60b1e"
          stroke="#990000"
          strokeWidth="1"
        />
        <circle cx="35" cy="11" r="2.5" fill="#f1bf00" />
        <circle cx="15" cy="14" r="2" fill="#f1bf00" />
        <circle cx="55" cy="14" r="2" fill="#f1bf00" />
        <rect x="0" y="30" width="5" height="55" rx="1.5" fill="#d4d4d4" stroke="#888" strokeWidth="0.8" />
        <rect x="-2" y="27" width="9" height="4" fill="#f1bf00" />
        <rect x="-2" y="84" width="9" height="5" fill="#f1bf00" />
        <path d="M -4 48 Q 2 42 10 50" stroke="#c60b1e" strokeWidth="3" fill="none" />
        <rect x="65" y="30" width="5" height="55" rx="1.5" fill="#d4d4d4" stroke="#888" strokeWidth="0.8" />
        <rect x="63" y="27" width="9" height="4" fill="#f1bf00" />
        <rect x="63" y="84" width="9" height="5" fill="#f1bf00" />
        <path d="M 61 48 Q 67 42 75 50" stroke="#c60b1e" strokeWidth="3" fill="none" />
        <path
          d="M 15 32 L 55 32 L 55 64 Q 55 86 35 94 Q 15 86 15 64 Z"
          fill="#c60b1e"
          stroke="#990000"
          strokeWidth="1.5"
        />
        <path d="M 16 33 H 35 V 58 H 16 Z" fill="#c60b1e" />
        <path d="M 21 53 h 9 v -10 h -2 v -3 h -1.5 v 2 h -2 v -2 h -1.5 v 3 h -2 z" fill="#f1bf00" />
        <path d="M 35 33 H 54 V 58 H 35 Z" fill="#ffffff" />
        <path d="M 40 54 c 2 -4 5 -3 5 -8 c 0 -3 -2 -4 -4 -3 c 1 2 0 4 -2 5 c 0 2 0 4 1 6 z" fill="#800080" />
        <path d="M 16 58 H 35 V 77 Q 23 74 16 66 Z" fill="#f1bf00" />
        <path d="M 21 58 v 18 M 26 58 v 19 M 31 58 v 19" stroke="#c60b1e" strokeWidth="2" />
        <path d="M 35 58 H 54 Q 47 74 35 77 Z" fill="#c60b1e" />
        <path d="M 38 61 L 51 74 M 51 61 L 38 74 M 44 60 V 76 M 36 67 H 53" stroke="#f1bf00" strokeWidth="1.2" />
        <ellipse cx="35" cy="58" rx="5" ry="6" fill="#002776" stroke="#c60b1e" strokeWidth="0.8" />
        <circle cx="35" cy="58" r="1.5" fill="#f1bf00" />
      </g>
    </svg>
  );
}

const languageFlags: Record<SupportedLanguage, ReactNode> = {
  pt: <FlagBR />,
  en: <FlagUS />,
  es: <FlagES />,
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
