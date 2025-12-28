import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Event } from "@/data/events";

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const categoryColors: Record<string, string> = {
    music: "bg-pink-100 text-pink-700",
    tech: "bg-blue-100 text-blue-700",
    food: "bg-orange-100 text-orange-700",
    business: "bg-green-100 text-green-700",
    sports: "bg-purple-100 text-purple-700",
    art: "bg-yellow-100 text-yellow-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/events/${event.id}`}>
        <Card hover className="overflow-hidden group h-full">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 gradient-overlay opacity-40" />
            
            {/* Badge */}
            <div className="absolute top-3 left-3">
              <Badge className={categoryColors[event.category] || "bg-secondary text-secondary-foreground"}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 right-3">
              <Badge variant={event.ticketType === "free" ? "secondary" : "default"} className="font-semibold">
                {event.ticketType === "free" ? "Free" : `₹${event.price}`}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{event.date} • {event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="truncate">{event.location}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attending</span>
                </div>
                <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  <span>View</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default EventCard;
