import { Link } from "react-router-dom";
import { Calendar, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    platform: [
      { to: "/events", label: "Browse Events" },
      { to: "/create-event", label: "Create Event" },
      { to: "/dashboard", label: "Dashboard" },
    ],
    categories: [
      { to: "/events?category=music", label: "Music" },
      { to: "/events?category=tech", label: "Tech & Innovation" },
      { to: "/events?category=food", label: "Food & Drink" },
      { to: "/events?category=business", label: "Business" },
    ],
    support: [
      { to: "#", label: "Help Center" },
      { to: "#", label: "Contact Us" },
      { to: "#", label: "Privacy Policy" },
      { to: "#", label: "Terms of Service" },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-button">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Event<span className="text-[#ec7d07]">LOG</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Discover amazing events near you, connect with your community, and create unforgettable experiences.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>hello@eventlog.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EventLOG | All rights reserved</p>
          
          <p className="mt-[12px]">Crafted with  <i className="fa-regular fa-heart"></i>  by AS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
