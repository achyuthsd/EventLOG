import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  CalendarDays,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { fetchEvents } from "@/services/eventService"; // backend fetch service
import { Event } from "@/data/events";

const Dashboard = () => {
  const { toast } = useToast();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://eventlog-temv.onrender.com/api/events"; // backend endpoint

  // 🔹 Fetch user events from backend
  const loadEvents = async () => {
    try {
      setLoading(true);
      const events = await fetchEvents();
      setUserEvents(events); // show first 4 events in dashboard
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // 🔹 Delete event via API
  const handleDelete = async (eventId: string) => {
    try {
      const res = await fetch(`${API_URL}/${eventId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");

      setUserEvents((prev) => prev.filter((e) => e.id !== eventId));

      toast({
        title: "Event Deleted",
        description: "The event has been removed from your dashboard.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Could not delete event",
        variant: "destructive",
      });
    }
  };

  // 🔹 Stats calculation
  const stats = [
    {
      icon: CalendarDays,
      label: "Total Events",
      value: userEvents.length,
      color: "text-primary",
    },
    {
      icon: Users,
      label: "Total Attendees",
      value: userEvents.reduce((acc, e) => acc + (e.attendees || 0), 0),
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: userEvents.filter((e) => {
        const eventDate = new Date(e.date);
        const now = new Date();
        return (
          eventDate.getMonth() === now.getMonth() &&
          eventDate.getFullYear() === now.getFullYear()
        );
      }).length,
      color: "text-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                  My Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage your events and track their performance
                </p>
              </div>
              <Button variant="hero" size="lg" className="gap-2" asChild>
                <Link to="/create-event">
                  <Plus className="w-5 h-5" />
                  Create Event
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-4 mb-8"
          >
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold font-display text-foreground">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>

          {/* Events List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your Events
              </h2>
            </div>

            {loading ? (
              <p className="text-muted-foreground">Loading events...</p>
            ) : userEvents.length > 0 ? (
              <div className="space-y-4">
                {userEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Image */}
                        <div className="w-full md:w-40 h-32 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-semibold text-foreground truncate">
                                  {event.title}
                                </h3>
                                <Badge
                                  variant={
                                    event.ticketType === "free"
                                      ? "secondary"
                                      : "default"
                                  }
                                  className="flex-shrink-0"
                                >
                                  {event.ticketType === "free"
                                    ? "Free"
                                    : `₹${event.price}`}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {event.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {event.attendees || 0} attending
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    to={`/events/${event.id}`}
                                    className="flex items-center gap-2"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Event
                                  </Link>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem
                                  className="flex items-center gap-2 text-destructive"
                                  onClick={() => handleDelete(event.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete Event
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No Events Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create your first event to get started
                </p>
                <Button asChild>
                  <Link to="/create-event" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Event
                  </Link>
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
