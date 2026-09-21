import { useCallback, useState } from "react";
import { useLocation } from "wouter";
import { Mail, CreditCard, Lock, CheckCircle2, ChevronRight, Apple } from "lucide-react";

interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone: string;
  paymentMethod: "pix" | "credit_card";
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}

interface PersonalDataStepProps {
  onBackToSelection: () => void;
  onCompleteOrder: (data: CustomerData) => void;
  totalPix: number;
}

const onlyDigits = (value: string) => value.replace(/\D/g, "");

/** 000.000.000-00 (progressiva durante a digitação) */
const maskCPF = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length > 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  if (digits.length > 6) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  if (digits.length > 3) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  return digits;
};

/** (00) 00000-0000 ou (00) 0000-0000 (progressiva durante a digitação) */
const maskPhone = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export function PersonalDataStep({ onBackToSelection, onCompleteOrder, totalPix }: PersonalDataStepProps) {
  const [activeSubStep, setActiveSubStep] = useState<1 | 2 | 3>(1); // 1: Email, 2: Dados Pessoais, 3: Pagamento
  // Navegação SPA com base do Router (funciona sob o subcaminho do GitHub Pages)
  const [, navigate] = useLocation();

  const [formData, setFormData] = useState<CustomerData>({
    email: "",
    firstName: "",
    lastName: "",
    cpf: "",
    phone: "",
    paymentMethod: "pix",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback((field: keyof CustomerData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleNextSubStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSubStep === 1) {
      if (!formData.email) return;
      setActiveSubStep(2);
    } else if (activeSubStep === 2) {
      if (!formData.firstName || !formData.cpf) return;
      setActiveSubStep(3);
    } else if (activeSubStep === 3) {
      setIsSuccess(true);
      onCompleteOrder(formData);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-step-container checkout-success-box">
        <div className="success-icon-wrapper">
          <CheckCircle2 size={64} className="success-icon" />
        </div>
        <h2>Compra realizada com sucesso!</h2>
        <p className="success-subtitle">
          Enviamos os ingressos e o comprovante para <strong>{formData.email}</strong>.
        </p>
        
        <div className="success-details-card">
          <div className="success-row">
            <span>Titular:</span>
            <strong>{formData.firstName} {formData.lastName}</strong>
          </div>
          <div className="success-row">
            <span>CPF:</span>
            <strong>{formData.cpf}</strong>
          </div>
          <div className="success-row">
            <span>Forma de pagamento:</span>
            <strong>{formData.paymentMethod === "pix" ? "PIX" : "Cartão de Crédito"}</strong>
          </div>
          <div className="success-row">
            <span>Valor pago:</span>
            <strong className="price-highlight">
              {totalPix.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </strong>
          </div>
        </div>

        <button className="back-home-btn" onClick={() => navigate("/")}>
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-step-container">
      {/* Header com os Sub-passos (Email -> Dados -> Pagamento) */}
      <div className="checkout-substeps-bar">
        <button 
          className={`substep-item ${activeSubStep === 1 ? "active" : activeSubStep > 1 ? "completed" : ""}`}
          onClick={() => activeSubStep > 1 && setActiveSubStep(1)}
        >
          <span className="substep-number">1</span>
          <span className="substep-label">E-mail</span>
        </button>
        <div className="substep-line" />
        <button 
          className={`substep-item ${activeSubStep === 2 ? "active" : activeSubStep > 2 ? "completed" : ""}`}
          onClick={() => activeSubStep > 2 && setActiveSubStep(2)}
        >
          <span className="substep-number">2</span>
          <span className="substep-label">Dados Pessoais</span>
        </button>
        <div className="substep-line" />
        <button className={`substep-item ${activeSubStep === 3 ? "active" : ""}`}>
          <span className="substep-number">3</span>
          <span className="substep-label">Pagamento</span>
        </button>
      </div>

      <div className="checkout-step-header">
        <button className="back-link" onClick={onBackToSelection}>
          ← Alterar data ou ingressos
        </button>
        <h2>Falta pouco para garantir sua aventura!</h2>
        <p>Preencha seus dados para finalizar a compra e receber seus ingressos.</p>
      </div>

      <form onSubmit={handleNextSubStep} className="checkout-form">
        {/* SUB-PASSO 1: E-MAIL */}
        {activeSubStep === 1 && (
          <div className="form-section fade-in">
            <h3>Preencha seu e-mail para avançar</h3>
            <div className="input-group">
              <label htmlFor="email">Endereço de e-mail *</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div className="social-login-separator">
              <span>ou continue com</span>
            </div>

            <div className="social-buttons-row">
              <button type="button" className="social-btn">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={18} />
                Google
              </button>
              <button type="button" className="social-btn">
                <Apple size={18} aria-hidden="true" />
                Apple
              </button>
            </div>

            <button type="submit" className="form-submit-btn">
              Continuar para Dados Pessoais <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* SUB-PASSO 2: DADOS PESSOAIS */}
        {activeSubStep === 2 && (
          <div className="form-section fade-in">
            <h3>Seus dados de cobrança</h3>

            <div className="input-grid-2">
              <div className="input-group">
                <label htmlFor="firstName">Primeiro Nome *</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Nome"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Último Nome *</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Sobrenome"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="input-grid-2">
              <div className="input-group">
                <label htmlFor="cpf">CPF *</label>
                <input
                  id="cpf"
                  type="text"
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  required
                  maxLength={14}
                  value={formData.cpf}
                  onChange={(e) => handleChange("cpf", maskCPF(e.target.value))}
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Número de Telefone *</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(00) 00000-0000"
                  required
                  maxLength={15}
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", maskPhone(e.target.value))}
                />
              </div>
            </div>

            <button type="submit" className="form-submit-btn">
              Ir para o Pagamento <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* SUB-PASSO 3: PAGAMENTO */}
        {activeSubStep === 3 && (
          <div className="form-section fade-in">
            <h3>Selecione a forma de pagamento</h3>

            <div className="payment-options">
              <label className={`payment-option-card ${formData.paymentMethod === "pix" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={formData.paymentMethod === "pix"}
                  onChange={() => handleChange("paymentMethod", "pix")}
                />
                <div className="payment-option-info">
                  <strong>PIX com Desconto</strong>
                  <span>Aprovação imediata do pedido</span>
                </div>
                <span className="pix-badge">Desconto de 5%</span>
              </label>

              <label className={`payment-option-card ${formData.paymentMethod === "credit_card" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === "credit_card"}
                  onChange={() => handleChange("paymentMethod", "credit_card")}
                />
                <div className="payment-option-info">
                  <strong>Cartão de Crédito</strong>
                  <span>Parcele em até 10x sem juros</span>
                </div>
              </label>
            </div>

            {formData.paymentMethod === "credit_card" && (
              <div className="credit-card-inputs">
                <div className="input-group">
                  <label htmlFor="cardNumber">Número do Cartão *</label>
                  <div className="input-with-icon">
                    <CreditCard size={18} />
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => handleChange("cardNumber", e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="cardName">Nome no Cartão *</label>
                  <input
                    id="cardName"
                    type="text"
                    placeholder="Como impresso no cartão"
                    required
                    value={formData.cardName}
                    onChange={(e) => handleChange("cardName", e.target.value)}
                  />
                </div>

                <div className="input-grid-2">
                  <div className="input-group">
                    <label htmlFor="cardExpiry">Validade (MM/AA) *</label>
                    <input
                      id="cardExpiry"
                      type="text"
                      placeholder="MM/AA"
                      required
                      value={formData.cardExpiry}
                      onChange={(e) => handleChange("cardExpiry", e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="cardCvc">CVC/CVV *</label>
                    <input
                      id="cardCvc"
                      type="text"
                      placeholder="123"
                      required
                      value={formData.cardCvc}
                      onChange={(e) => handleChange("cardCvc", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="form-submit-btn finish-btn">
              <Lock size={18} /> Finalizar e Pagar {totalPix.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
