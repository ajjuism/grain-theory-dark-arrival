import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Film, Mail, Instagram, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-bg.jpg";
import CountdownTimer from "./CountdownTimer";

const GrainTheoryLanding = () => {
  // Force component refresh - countdown timer implementation
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you!",
        description: "We'll notify you when we launch.",
      });
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background grain-overlay relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: "brightness(0.3) contrast(1.2)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Grain Theory" className="h-8" />
            </div>
            <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
              <span>Photography</span>
              <span>Videography</span>
              <span>Post-Production</span>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-8 -mt-32 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 hero-title fade-in-up">
              GRAIN
              <br />
              THEORY
            </h1>
            
            {/* Countdown Timer */}
            <CountdownTimer />
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up-delay">
              Where visual storytelling meets technical excellence. 
              A production house crafting cinematic experiences.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up-delay-2">
              <div className="flex items-center gap-2 text-primary">
                <Camera className="w-5 h-5" />
                <span>Photography</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Film className="w-5 h-5" />
                <span>Videography</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <span>Production</span>
              </div>
            </div> */}

            {/* Email Signup */}
            <div className="max-w-md mx-auto fade-in-up-delay-2">
              <form onSubmit={handleEmailSubmit} className="flex gap-3 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                  required
                />
                <Button type="submit" className="btn-accent px-6">
                  <Mail className="w-4 h-4 mr-2" />
                  Notify Me
                </Button>
              </form>
              <p className="text-sm text-muted-foreground">
                Be the first to know when we launch
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-2">
                Coming Soon 2024
              </p>
              <p className="text-xs text-muted-foreground">
                mail@graintheoryfilms.com • +91 90360 43152
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GrainTheoryLanding;