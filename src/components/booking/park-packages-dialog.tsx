import { useMemo, useState } from "react";
import { ArrowRight, Check, MessageCircle, Ticket, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { parkPackages } from "@/data/park-packages";

const whatsappNumber = "5588981338506";

type ParkPackagesDialogProps = {
  onClose: () => void;
  initialPackageId?: string;
};

export function ParkPackagesDialog({
  onClose,
  initialPackageId,
}: ParkPackagesDialogProps) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(
    initialPackageId ?? parkPackages[0].id,
  );
  const selectedPackage =
    parkPackages.find((item) => item.id === selectedId) ?? parkPackages[0];
  const selectedName = t(`parkPackages.items.${selectedPackage.id}.name`);
  const isFocused = Boolean(initialPackageId);
  const message = useMemo(
    () =>
      [
        t("parkPackagesUi.whatsappInterest", { name: selectedName }),
        t("parkPackagesUi.whatsappPrice", { price: selectedPackage.price.toLocaleString("pt-BR") }),
        t("parkPackagesUi.whatsappConfirm"),
      ].join("\n"),
    [selectedPackage, selectedName, t],
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className={`park-packages-panel${isFocused ? " park-packages-panel-focused" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="park-packages-title"
        data-testid="dialog-pacotes-little-beach"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label={t("parkPackagesUi.closePackages")}
          data-testid="button-fechar-pacotes"
        >
          <X size={19} />
        </button>
        <div className="panel-kicker">
          <span className="eyebrow-dot" /> {t("parkPackagesUi.accessKicker")}
        </div>
        <h2 id="park-packages-title">
          {isFocused ? (
            <>
              {t("parkPackagesUi.yourPackageLine1")}
              <br />
              <em>{t("parkPackagesUi.yourPackageHighlight")}</em>
            </>
          ) : (
            <>
              {t("parkPackagesUi.chooseAdventureLine1")}
              <br />
              <em>{t("parkPackagesUi.chooseAdventureHighlight")}</em>
            </>
          )}
        </h2>
        <p className="park-packages-intro">
          {isFocused
            ? t("parkPackagesUi.focusedIntro", { name: selectedName })
            : t("parkPackagesUi.generalIntro")}
        </p>
        {isFocused ? (
          <article className="park-package-detail">
            <div className="park-package-detail-top">
              <span className="park-package-icon">
                <Ticket size={20} />
              </span>
              <span className="park-package-price">
                R$ {selectedPackage.price.toLocaleString("pt-BR")}{" "}
                <small>{t(`parkPackages.items.${selectedPackage.id}.note`)}</small>
              </span>
            </div>
            <h3>{selectedName}</h3>
            <p>{t(`parkPackages.items.${selectedPackage.id}.description`)}</p>
            <span className="park-package-detail-label">
              {t("parkPackagesUi.includedLabel")}
            </span>
            <ul>
              {(t(`parkPackages.items.${selectedPackage.id}.benefits`, { returnObjects: true }) as string[]).map((benefit) => (
                <li key={benefit}>
                  <Check size={14} /> {benefit}
                </li>
              ))}
            </ul>
          </article>
        ) : (
          <>
            <div className="park-packages-list">
              {parkPackages.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`park-package-card${selectedId === item.id ? " is-selected" : ""}`}
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={selectedId === item.id}
                  data-testid={`button-pacote-${item.id}`}
                >
                  <div className="park-package-card-top">
                    <span className="park-package-icon">
                      <Ticket size={17} />
                    </span>
                    <span className="park-package-price">
                      R$ {item.price.toLocaleString("pt-BR")}{" "}
                      <small>{t(`parkPackages.items.${item.id}.note`)}</small>
                    </span>
                  </div>
                  <strong>{t(`parkPackages.items.${item.id}.name`)}</strong>
                  <span className="park-package-description">
                    {t(`parkPackages.items.${item.id}.description`)}
                  </span>
                  <span className="park-package-benefits">
                    {(t(`parkPackages.items.${item.id}.benefits`, { returnObjects: true }) as string[]).map((benefit) => (
                      <span key={benefit}>
                        <Check size={13} /> {benefit}
                      </span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
            <div className="park-package-selected">
              <span>{t("parkPackagesUi.chosenPackage")}</span>
              <strong>{selectedName}</strong>
            </div>
          </>
        )}
        <a
          className="park-button park-button-blue park-packages-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          data-testid="button-comprar-pacote-whatsapp"
        >
          {t("parkPackagesUi.continueWhatsapp")} <MessageCircle size={17} />{" "}
          <ArrowRight size={15} />
        </a>
      </section>
    </div>
  );
}
