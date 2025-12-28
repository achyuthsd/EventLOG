import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Event, categories } from "@/data/events";
import { fetchEvents } from "@/services/eventService";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(() => {});
  }, []);

  const featuredEvents = events.slice(0, 3);

  const features = [
    {
      icon: Sparkles,
      title: "Discover Events",
      description: "Find amazing events happening near you",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Community",
      description: "Connect with like-minded people",
    },
    {
      icon: Shield,
      title: "Secure & Simple",
      description: "Safe registration and ticketing",
    },
  ];


  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-5xl font-bold mb-6">
              Find Your Next
              <span className="block text-primary">Amazing Event</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover events, meet people, and create memories.
            </p>

            <div className="flex gap-3 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                <Input className="pl-12 h-14" placeholder="Search events..." />
              </div>
              <Button size="xl" asChild>
                <Link to="/events">
                  Explore
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Multiple Events</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Multiple Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Growing Community</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/events?category=${category.id}`}
              className="p-6 bg-card rounded-2xl text-center hover:shadow-lg"
            >
              <div className="text-3xl">{category.icon}</div>
              <div className="font-medium mt-2">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Featured Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-8 bg-card rounded-2xl text-center"
            >
              <f.icon className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
