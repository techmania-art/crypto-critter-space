import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShopProps {
  onBack: () => void;
}

const Shop: React.FC<ShopProps> = ({ onBack }) => {
  const [wallet, setWallet] = useState({ eth: 20, btc: 15 });
  const { toast } = useToast();

  const shopItems = [
    {
      id: 1,
      name: "ETH Token Pack",
      description: "10 Ethereum tokens for feeding",
      price: { eth: 0, btc: 5 },
      icon: "⚡",
      reward: { eth: 10, btc: 0 }
    },
    {
      id: 2,
      name: "BTC Token Pack",
      description: "10 Bitcoin tokens for feeding",
      price: { eth: 5, btc: 0 },
      icon: "₿",
      reward: { eth: 0, btc: 10 }
    },
    {
      id: 3,
      name: "Happiness Boost",
      description: "Instantly increase pet happiness",
      price: { eth: 3, btc: 3 },
      icon: "🎉",
      reward: { eth: 0, btc: 0 }
    },
    {
      id: 4,
      name: "Rainbow Aura",
      description: "Cosmetic pet enhancement",
      price: { eth: 8, btc: 8 },
      icon: "🌈",
      reward: { eth: 0, btc: 0 }
    }
  ];

  const canAfford = (price: { eth: number; btc: number }) => {
    return wallet.eth >= price.eth && wallet.btc >= price.btc;
  };

  const purchaseItem = (item: typeof shopItems[0]) => {
    if (canAfford(item.price)) {
      setWallet(prev => ({
        eth: prev.eth - item.price.eth + item.reward.eth,
        btc: prev.btc - item.price.btc + item.reward.btc
      }));
      
      toast({
        title: "🛍️ Purchase Successful!",
        description: `You bought ${item.name}!`,
      });
    } else {
      toast({
        title: "💸 Insufficient Funds",
        description: "You don't have enough tokens for this purchase.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent">
            Crypto Pet Shop
          </h1>
          <Button variant="cyber" onClick={onBack}>
            ← Back to Portal
          </Button>
        </div>

        {/* Wallet Display */}
        <div className="glass-effect rounded-xl p-6 border border-primary/30 mb-8 max-w-md">
          <h2 className="text-xl font-semibold text-accent mb-4">Your Wallet</h2>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              ETH: {wallet.eth}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              BTC: {wallet.btc}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {shopItems.map((item) => {
            const affordable = canAfford(item.price);
            
            return (
              <div
                key={item.id}
                className={`glass-effect rounded-xl p-6 border transition-all duration-300 ${
                  affordable 
                    ? 'border-primary/30 hover:border-accent/50 hover:shadow-glow-accent' 
                    : 'border-muted/20 opacity-60'
                }`}
              >
                <div className="text-4xl mb-4 text-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-accent">Price:</div>
                  <div className="flex gap-2 text-sm">
                    {item.price.eth > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {item.price.eth}
                      </span>
                    )}
                    {item.price.btc > 0 && (
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        {item.price.btc}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  variant={affordable ? "neon" : "outline"}
                  className="w-full"
                  disabled={!affordable}
                  onClick={() => purchaseItem(item)}
                >
                  {affordable ? "Purchase" : "Can't Afford"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="glass-effect rounded-xl p-8 border border-primary/30 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-accent mb-4">
              Free Token Generator
            </h2>
            <p className="text-muted-foreground mb-6">
              Get free tokens every hour to keep your pet happy!
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="cyber"
                onClick={() => {
                  setWallet(prev => ({ ...prev, eth: prev.eth + 5 }));
                  toast({ title: "🎁 Free ETH!", description: "Added 5 ETH to your wallet!" });
                }}
              >
                Claim 5 ETH
              </Button>
              <Button
                variant="cyber"
                onClick={() => {
                  setWallet(prev => ({ ...prev, btc: prev.btc + 5 }));
                  toast({ title: "🎁 Free BTC!", description: "Added 5 BTC to your wallet!" });
                }}
              >
                Claim 5 BTC
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;