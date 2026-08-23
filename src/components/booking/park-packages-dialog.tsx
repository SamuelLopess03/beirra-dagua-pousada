import { useState } from "react";
import { ArrowRight, Check, MessageCircle, Ticket, X } from "lucide-react";
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
  const [selectedId, setSelectedId] = useState(
    initialPackageId ?? parkPackages[0].id,
  );
  const selectedPackage =
    parkPackages.find((item) => item.id === selectedId) ?? parkPackages[0];
  const message = [
    `Olá! Quero saber como comprar o pacote "${selectedPackage.name}" do Little Beach.`,
    `Valor de referência: R$ ${selectedPackage.price.toLocaleString("pt-BR")}.`,
    "Gostaria de confirmar disponibilidade, regras de acesso e formas de pagamento.",
  ].join("\n");
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
        className="park-packages-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="park-packages-title"
        data-testid="dialog-pacotes-little-beach"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar pacotes"
          data-testid="button-fechar-pacotes"
        >
          <X size={19} />
        </button>
        <div className="panel-kicker">
          <span className="eyebrow-dot" /> Acesso Little Beach
        </div>
        <h2 id="park-packages-title">
          Escolha seu
          <br />
          <em>pacote de aventura.</em>
        </h2>
        <p className="park-packages-intro">
          Consulte as opções de acesso, compare o que cada uma inclui e fale com
          a equipe para confirmar a disponibilidade.
        </p>
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
                  <small>{item.note}</small>
                </span>
              </div>
              <strong>{item.name}</strong>
              <span className="park-package-description">
                {item.description}
              </span>
              <span className="park-package-benefits">
                {item.benefits.map((benefit) => (
                  <span key={benefit}>
                    <Check size={13} /> {benefit}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
        <div className="park-package-selected">
          <span>Pacote escolhido</span>
          <strong>{selectedPackage.name}</strong>
        </div>
        <a
          className="park-button park-button-blue park-packages-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          data-testid="button-comprar-pacote-whatsapp"
        >
          Continuar pelo WhatsApp <MessageCircle size={17} />{" "}
          <ArrowRight size={15} />
        </a>
      </section>
    </div>
  );
}
