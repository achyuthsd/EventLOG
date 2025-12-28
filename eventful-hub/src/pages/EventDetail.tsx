import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  ArrowLeft,
  Ticket,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Event } from "@/data/events";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://eventlog-temv.onrender.com/api/events"; // adjust if needed

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 fetch single event by id
  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Event not found");

        const json = await res.json();

        const e = json.data;

        // map backend → frontend
        const mappedEvent: Event = {
          id: e._id,
          title: e.title,
          description: e.description,
          date: new Date(e.date).toDateString(),
          time: e.time,
          location: e.location,
          category: e.category,
          image: e.image,
          attendees: e.attendees,
          ticketType: e.ticketType,
          price: e.price,
        };

        setEvent(mappedEvent);
      } catch (err) {
        setError("Event not found");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">
            Event Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The event you're looking for doesn't exist or was removed.
          </p>
          <Button asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    music: "bg-pink-100 text-pink-700",
    tech: "bg-blue-100 text-blue-700",
    food: "bg-orange-100 text-orange-700",
    business: "bg-green-100 text-green-700",
    sports: "bg-purple-100 text-purple-700",
    art: "bg-yellow-100 text-yellow-700",
  };

  const handleRegister = () => {
    toast({
      title: "Registration Successful!",
      description: "You've successfully registered for this event.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Event link copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 -mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    className={
                      categoryColors[event.category] ??
                      "bg-secondary text-secondary-foreground"
                    }
                  >
                    {event.category.toUpperCase()}
                  </Badge>
                  <Badge
                    variant={
                      event.ticketType === "free" ? "secondary" : "default"
                    }
                  >
                    {event.ticketType === "free"
                      ? "Free"
                      : `₹${event.price}`}
                  </Badge>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {event.title}
                </h1>

                <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {event.location}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <Card className="p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold mb-1">
                  {event.ticketType === "free"
                    ? "Free"
                    : `₹${event.price}`}
                </p>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <Users className="w-5 h-5" />
                {event.attendees} attending
              </div>

              <Button className="w-full gap-2 mb-4" onClick={handleRegister}>
                <Ticket className="w-5 h-5" />
                Register Now
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
               
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventDetail;
