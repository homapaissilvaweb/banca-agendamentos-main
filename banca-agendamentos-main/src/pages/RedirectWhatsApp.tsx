import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function RedirectWhatsApp() {
  const [params] = useSearchParams();

  useEffect(() => {
    const mensagem = params.get("mensagem") || "Olá! Seu agendamento foi confirmado 💈";
    const whatsappUrl = `https://wa.me/5516994325925?text=${encodeURIComponent(mensagem)}`;
    window.location.replace(whatsappUrl);
  }, [params]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">Redirecionando para o WhatsApp...</h2>
      <p className="text-muted-foreground">
        Se não abrir, <a href="https://wa.me/5516994325925" className="text-primary hover:underline">clique aqui</a>.
      </p>
    </div>
  );
}
