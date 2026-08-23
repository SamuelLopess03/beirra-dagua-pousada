import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "5588981338506";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Conte como podemos te chamar." })
    .max(100, { message: "Nome muito longo (máx. 100 caracteres)." }),
  email: z
    .string()
    .trim()
    .email({ message: "Informe um e-mail válido." })
    .max(255, { message: "E-mail muito longo (máx. 255 caracteres)." }),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Conte um pouco do que você procura." })
    .max(1000, { message: "Mensagem muito longa (máx. 1000 caracteres)." }),
});

function openWhatsApp(text: string) {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = contactSchema.safeParse({ name, email, message });

    if (!result.success) {
      toast.error(
        result.error.issues[0]?.message ?? "Revise os campos do formulário.",
      );
      return;
    }

    const { name: n, email: e, message: m } = result.data;
    openWhatsApp(`Olá! Meu nome é ${n} (${e}).\n\nO que eu quero viver: ${m}`);
  };

  return (
    <section
      id="contato"
      className="bg-[#FF8C2A] px-6 py-20 text-[#F5EDDA] sm:px-10 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.25em] opacity-80">
            Fale com a gente
          </p>
          <h2
            className="mb-10 text-5xl leading-[1.05] tracking-tight sm:text-6xl"
            style={{ fontFamily: "var(--app-font-serif)" }}
          >
            Ainda ficou <span className="italic">alguma dúvida?</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed opacity-90">
            A sua viagem começa na primeira pergunta. Fale com o nosso time e
            descubra o roteiro perfeito para a sua família — sem compromisso,
            com a paciência de quem ama o que faz.
          </p>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() =>
              openWhatsApp("Olá! Gostaria de saber mais sobre a pousada.")
            }
            className="mt-10 rounded-none border-[#F5EDDA]/70 bg-transparent px-7 text-[#F5EDDA] hover:bg-[#F5EDDA] hover:text-[#FF8C2A] uppercase tracking-[0.11em] text-[10px] font-bold"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "10px",
              letterSpacing: "0.11em",
            }}
          >
            <MessageCircle className="size-4" />
            Falar pelo WhatsApp
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="rounded-none bg-[#F5EDDA] p-8 text-[#2A6FA8] shadow-xl sm:p-12">
          <h3
            className="text-3xl tracking-tight"
            style={{ fontFamily: "var(--app-font-serif)" }}
          >
            Vamos conversar?
          </h3>
          <p className="mt-1 text-sm opacity-70">
            Respondemos em até 24 horas.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div className="space-y-2">
              <Label
                htmlFor="contact-name"
                className="text-[0.7rem] uppercase tracking-[0.18em] opacity-70"
              >
                Seu nome
              </Label>
              <Input
                id="contact-name"
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                className="h-12 rounded-none border-[#2A6FA8]/20 bg-white text-[#2A6FA8] placeholder:text-[#2A6FA8]/50 focus-visible:ring-[#3D8FD1]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-email"
                className="text-[0.7rem] uppercase tracking-[0.18em] opacity-70"
              >
                Seu e-mail
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                maxLength={255}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="h-12 rounded-none border-[#2A6FA8]/20 bg-white text-[#2A6FA8] placeholder:text-[#2A6FA8]/50 focus-visible:ring-[#3D8FD1]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact-message"
                className="text-[0.7rem] uppercase tracking-[0.18em] opacity-70"
              >
                O que você quer viver?
              </Label>
              <Textarea
                id="contact-message"
                value={message}
                maxLength={1000}
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Conte o que você procura..."
                className="rounded-none border-[#2A6FA8]/20 bg-white text-[#2A6FA8] placeholder:text-[#2A6FA8]/50 focus-visible:ring-[#3D8FD1]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="rounded-none bg-[#2A6FA8] px-7 text-white hover:bg-[#3D8FD1] uppercase tracking-[0.11em] text-[10px] font-bold"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "10px",
                letterSpacing: "0.11em",
              }}
            >
              Enviar mensagem
              <ArrowRight className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
