import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">BC</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Banca Cortez <span className="text-primary">Barber</span>
              </h3>
            </div>
            <p className="text-muted-foreground">
              Estilo e tradição em cada corte. Venha fazer parte da nossa história.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>(16) 99432-5925</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Rua José Bonifácio 1264</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <div className="flex flex-col">
                  <span>Seg-Qui: 9h - 18h</span>
                  <span>Sex: 9h - 20h</span>
                  <span>Sáb: 9h - 17h</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Barbearia Banca Cortez Barber. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
