import React, { useState } from 'react';
import VirtualPet from '@/components/VirtualPet';
import NavigationPortal from '@/components/NavigationPortal';
import Gallery from '@/components/Gallery';
import Shop from '@/components/Shop';
import { Button } from '@/components/ui/button';

type Page = 'home' | 'pet' | 'gallery' | 'shop';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'pet':
        return <VirtualPet />;
      case 'gallery':
        return <Gallery onBack={() => setCurrentPage('home')} />;
      case 'shop':
        return <Shop onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return renderPage();
};

const HomePage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-space relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary rounded-full animate-float"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 8 + 's',
              animationDuration: (Math.random() * 6 + 6) + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <h1 className="text-8xl font-bold bg-gradient-neon bg-clip-text text-transparent glow-text mb-6 animate-pulse-glow">
            CryptoPet
          </h1>
          <p className="text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Welcome to the future of digital companions. Feed, care for, and bond with your 3D virtual pet using cryptocurrency tokens.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="neon"
              size="lg"
              onClick={() => onNavigate('pet')}
              className="text-lg px-8"
            >
              Meet Your Pet 🐾
            </Button>
            <Button
              variant="cyber"
              size="lg"
              onClick={() => onNavigate('shop')}
              className="text-lg px-8"
            >
              Visit Shop 🛍️
            </Button>
          </div>
        </div>

        {/* Navigation Portal */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8 text-accent">
            Explore the Metaverse
          </h2>
          <NavigationPortal onNavigate={onNavigate} />
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-xl p-8 border border-primary/30 text-center group hover:shadow-glow-primary transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎮</div>
              <h3 className="text-xl font-semibold text-primary mb-3">Interactive 3D Pet</h3>
              <p className="text-muted-foreground">
                Your pet responds to your interactions, changes colors based on happiness, and floats with joy when well-fed.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 border border-accent/30 text-center group hover:shadow-glow-accent transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:animate-bounce">💎</div>
              <h3 className="text-xl font-semibold text-accent mb-3">Crypto Feeding</h3>
              <p className="text-muted-foreground">
                Feed your pet with ETH and BTC tokens. Watch as it happily devours digital currency with satisfying animations.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 border border-digital-green/30 text-center group hover:shadow-glow-accent transition-all duration-300">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🌌</div>
              <h3 className="text-xl font-semibold text-digital-green mb-3">3D Navigation</h3>
              <p className="text-muted-foreground">
                Navigate through floating portals to access different areas: pet care, memory gallery, and the token shop.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-primary/20">
          <p className="text-muted-foreground">
            Built with ❤️ using React Three Fiber • A playful take on digital pets and crypto culture
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
