import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Film, Mail, Instagram, Twitter, Linkedin, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-bg.jpg";
import CountdownTimer from "./CountdownTimer";

const GrainTheoryLanding = () => {
  // Force component refresh - countdown timer implementation
  const [email, setEmail] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Google Apps Script URL - Replace with your actual script URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwm04X9hUlmX-DjovgCjhEJNvkF-e-nCf48M8u404dxGgt8ecUKoxO4QR1OKxiUiXk/exec";
  

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Use FormData approach directly to avoid CORS issues
      const formData = new FormData();
      formData.append('email', email.trim());
      formData.append('ipAddress', await getClientIP());
      formData.append('userAgent', navigator.userAgent);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      // If no error is thrown, assume success
      toast({
        title: "Thank you!",
        description: "We'll notify you when we launch.",
      });
      setEmail("");
      
    } catch (error) {
      console.error('Error submitting email:', error);
      toast({
        title: "Error",
        description: "Failed to submit email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get client IP (fallback method)
  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'Unknown';
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
        {/* Floating Header */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4 md:px-6">
          <div className="bg-secondary/20 border border-border rounded-lg backdrop-blur-sm">
            <div className="flex justify-between items-center px-6 py-4">
              {/* Logo */}
              <div className="flex items-center group">
                <img src="/logo.svg" alt="Grain Theory" className="h-5 md:h-6 transition-colors duration-300 group-hover:text-primary" />
              </div>
              
              {/* Contact Link */}
              <a 
                href="mailto:mail@graintheoryfilms.com"
                className="relative flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 px-4 py-2 rounded-lg hover:bg-primary/10 group"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4"></span>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-8 pt-20 -mt-32 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 hero-title fade-in-up">
              GRAIN
              <br />
              THEORY
            </h1>
            
            {/* Countdown Timer */}
            <CountdownTimer />
            
            <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up-delay">
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
                <Button 
                  type="submit" 
                  className="btn-accent px-6" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? "Submitting..." : "Notify Me"}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground">
                Be the first to know when the new website launches
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground mb-2">
                Coming Soon 2025
              </p>
              <p className="text-xs text-muted-foreground">
                mail@graintheoryfilms.com • +91 90360 43152
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                asChild
              >
                <a href="https://www.instagram.com/graintheoryfilms" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                asChild
              >
                <a href="https://x.com/Grain_theory" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                asChild
              >
                <a href="https://www.linkedin.com/company/grain-theory-films" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GrainTheoryLanding;