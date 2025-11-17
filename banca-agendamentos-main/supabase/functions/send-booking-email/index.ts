import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  phone: z.string().transform((val: string) => val.replace(/\D/g, '')).pipe(z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos")),
  service: z.string().min(1, "Selecione um serviço").max(50, "Serviço muito longo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
  time: z.string().min(1, "Selecione um horário").max(10, "Horário inválido"),
});

interface BookingEmailRequest {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

const BARBERSHOP_EMAIL = 'barbeariabancacortez@gmail.com';
const BARBERSHOP_PHONE = '5516994325925'; // Número do WhatsApp do barbeiro

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_HOUR = 10;

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const clientIP = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (clientIP) {
    return clientIP;
  }

  // Fallback to a default identifier if IP cannot be determined
  return "unknown";
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }

  record.count++;
  return true;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    
    // Validate input
    const result = bookingSchema.safeParse(requestData);
    if (!result.success) {
      console.error("Validation failed:", result.error.errors);
      const errorMessages = result.error.errors.map((err: any) => err.message).join(", ");
      return new Response(
        JSON.stringify({ error: errorMessages }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, phone, service, date, time }: BookingEmailRequest = result.data;

    // Rate limiting by IP address
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      console.warn("Rate limit exceeded for IP:", clientIP);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("New booking received:", { name, phone, service, date, time });

    // Criar mensagem do WhatsApp
    const whatsappMessage = `Olá ${name}! Sua reserva foi registrada com sucesso!\n\n📅 Data: ${date}\n⏰ Horário: ${time}\n💇‍♂️ Serviço: ${service}\n\nAguarde a confirmação do barbeiro.`;

    const whatsappUrl = `https://wa.me/${BARBERSHOP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

    // Retornar resposta de sucesso com link do WhatsApp
    return new Response(
      JSON.stringify({
        message: "Reserva registrada com sucesso!",
        whatsapp: whatsappUrl,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
