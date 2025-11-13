import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Users, Sparkles } from "lucide-react";
import serviceCutImage from "@/assets/service-cut.jpg";
import serviceBeardImage from "@/assets/service-beard.jpg";
import serviceCompleteImage from "@/assets/service-complete.jpg";

const Services = () => {
  const services = [
    {
      icon: Scissors,
      title: "Corte de Cabelo",
      description: "Cortes modernos e clássicos com técnicas profissionais",
      price: "R$ 45,00",
      image: serviceCutImage,
    },
    {
      icon: Users,
      title: "Barba & Bigode",
      description: "Aparar, modelar e finalização com navalha",
      price: "R$ 35,00",
      image: serviceBeardImage,
    },
    {
      icon: Sparkles,
      title: "Pacote Completo",
      description: "Corte + Barba + Acabamento premium",
      price: "R$ 70,00",
      image: serviceCompleteImage,
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Qualidade, estilo e profissionalismo em cada atendimento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <service.icon className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-primary">
                    {service.price}
                  </span>
                </div>
                <CardTitle className="text-2xl text-foreground">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
