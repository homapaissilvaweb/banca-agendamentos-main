import { Award, Clock, MapPin } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Sobre a <span className="text-primary">Banca Cortez</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Com mais de 10 anos de experiência, a Barbearia Banca Cortez Barber
              se tornou referência em estilo e qualidade. Nossa equipe de
              profissionais qualificados está sempre pronta para oferecer o melhor
              atendimento.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Combinamos técnicas tradicionais com as tendências mais modernas do
              mercado, garantindo que cada cliente saia satisfeito e com um visual
              impecável.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    Profissionais Qualificados
                  </h3>
                  <p className="text-muted-foreground">
                    Equipe treinada e atualizada com as últimas tendências
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    Horários Flexíveis
                  </h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Seg-Qui: 9h - 18h</p>
                    <p>Sex: 9h - 20h</p>
                    <p>Sáb: 9h - 17h</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    Localização Privilegiada
                  </h3>
                  <p className="text-muted-foreground">
                    Rua José Bonifácio 1264 - Centro
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-transparent rounded-lg overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">10+</div>
                  <div className="text-xl text-foreground">Anos de Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
