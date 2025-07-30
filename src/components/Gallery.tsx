import React from 'react';
import { Button } from '@/components/ui/button';

interface GalleryProps {
  onBack: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const petMoments = [
    { id: 1, title: "First ETH Feed", description: "Your pet's first taste of Ethereum!", image: "🍎" },
    { id: 2, title: "Bitcoin Snack", description: "Crunchy BTC token enjoyed!", image: "🥕" },
    { id: 3, title: "Happy Bounce", description: "Pet reached maximum happiness!", image: "🎉" },
    { id: 4, title: "Floating Joy", description: "Levitating with contentment", image: "✨" },
  ];

  return (
    <div className="min-h-screen bg-gradient-space p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            Pet Memory Gallery
          </h1>
          <Button variant="cyber" onClick={onBack}>
            ← Back to Portal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {petMoments.map((moment) => (
            <div
              key={moment.id}
              className="glass-effect rounded-xl p-6 border border-primary/30 hover:border-accent/50 transition-all duration-300 group hover:shadow-glow-accent"
            >
              <div className="text-6xl mb-4 group-hover:animate-bounce">
                {moment.image}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                {moment.title}
              </h3>
              <p className="text-muted-foreground">
                {moment.description}
              </p>
              <div className="mt-4 text-xs text-accent">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-effect rounded-xl p-8 border border-primary/30 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-accent mb-4">
              Create New Memories
            </h2>
            <p className="text-muted-foreground mb-6">
              Keep feeding your pet and playing with it to unlock new gallery moments!
            </p>
            <Button variant="neon" onClick={onBack}>
              Return to Pet Care
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;