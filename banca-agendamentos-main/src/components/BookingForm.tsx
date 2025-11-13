import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
  phone: z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),
  service: z.string().min(1, "Selecione um serviço"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida")
    .refine((date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), "Não é possível agendar datas passadas"),
  time: z.string().min(1, "Selecione um horário"),
});

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validação com zod
      const result = bookingSchema.safeParse(formData);
      if (!result.success) {
        const errors = result.error.errors.map(err => err.message).join(", ");
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: errors,
        });
        setIsSubmitting(false);
        return;
      }

      // Verificar se já existe agendamento neste horário
      const { data: isAvailable, error: checkError } = await supabase
        .rpc('check_availability', {
          p_date: formData.date,
          p_time: formData.time
        });

      if (checkError) {
        console.error('Erro ao verificar agendamentos:', checkError);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível verificar a disponibilidade do horário.",
        });
        setIsSubmitting(false);
        return;
      }

      if (!isAvailable) {
        toast({
          variant: "destructive",
          title: "Horário indisponível",
          description: "Este horário já está reservado. Por favor, escolha outro horário.",
        });
        setIsSubmitting(false);
        return;
      }

      // Criar o agendamento
      const { error } = await supabase.from('bookings').insert([
        {
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time,
        },
      ]);

      if (error) {
        console.error('Erro ao criar agendamento:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível criar o agendamento. Tente novamente.",
        });
        setIsSubmitting(false);
        return;
      }

      // Enviar notificação para o barbeiro via WhatsApp e email
      const { data: notificationData, error: notificationError } = await supabase.functions.invoke('send-booking-email', {
        body: {
          name: formData.name,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.time,
        },
      });

      if (notificationError || notificationData?.error) {
        console.error('Notification failed');
        toast({
          title: "Agendamento salvo!",
          description: `Horário reservado para ${formData.date} às ${formData.time}. Redirecionando para WhatsApp...`,
        });
      } else {
        toast({
          title: "Agendamento realizado!",
          description: `Olá ${formData.name}, seu horário foi agendado para ${formData.date} às ${formData.time}. O barbeiro foi notificado via WhatsApp. Redirecionando para WhatsApp...`,
        });
      }

      // Redirecionar para WhatsApp após agendamento confirmado
      const serviceName = formData.service === 'corte' ? 'Corte de Cabelo' : formData.service === 'barba' ? 'Barba' : 'Corte + Barba';
      const mensagem = `Olá ${formData.name}! Seu agendamento foi realizado com sucesso 💈\n\nServiço: ${serviceName}\nData: ${formData.date}\nHorário: ${formData.time}`;
      window.location.href = `/whatsapp?mensagem=${encodeURIComponent(mensagem)}`;

      setFormData({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
      });
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="agendamento" className="py-20 px-4 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
            AGENDE SEU HORÁRIO
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-4 rounded-full"></div>
          <p className="text-muted-foreground text-lg">
            Preencha o formulário abaixo e garanta seu atendimento
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 p-8 md:p-10 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Telefone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="text-sm font-medium text-foreground">
                Serviço *
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
                required
              >
                <SelectTrigger className="h-12 bg-background/50 border-border focus:border-primary transition-colors">
                  <SelectValue placeholder="Selecione o serviço" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="corte">Corte de Cabelo</SelectItem>
                  <SelectItem value="barba">Barba</SelectItem>
                  <SelectItem value="completo">Corte + Barba</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-foreground">
                  Data *
                </Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-foreground">
                  Horário *
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) =>
                    setFormData({ ...formData, time: value })
                  }
                  required
                >
                  <SelectTrigger className="h-12 bg-background/50 border-border focus:border-primary transition-colors">
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                    <SelectItem value="18:00">18:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all hover:shadow-glow mt-8"
            >
              {isSubmitting ? "Agendando..." : "Confirmar Agendamento"}
            </Button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          * Campos obrigatórios
        </p>
      </div>
    </section>
  );
};

export default BookingForm;
