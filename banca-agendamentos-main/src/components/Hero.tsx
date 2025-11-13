import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-barbershop.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.3) 100%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Estilo e Tradição em{" "}
            <span className="text-primary">Cada Corte</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A melhor experiência em barbearia da cidade. Agende seu horário e
            venha fazer parte da nossa história.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("agendamento")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
            >
              Agendar Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8"
            >
              Nossos Serviços
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
