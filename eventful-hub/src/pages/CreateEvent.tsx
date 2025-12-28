import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Type,
  FileText,
  Image,
  Ticket,
  DollarSign,
  ArrowLeft,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/events";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://eventlog-temv.onrender.com/api/events"; // 🔴 change if needed

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    ticketType: "free",
    price: "",
    image: "",
    attendees: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔹 build payload exactly as backend expects
    const payload: any = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      category: formData.category,
      image: formData.image,
      attendees: formData.attendees,
      ticketType: formData.ticketType,
    };

    if (formData.ticketType === "paid") {
      payload.price = Number(formData.price);
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      toast({
        title: "Event Created!",
        description: "Your event has been successfully created.",
      });

      navigate("/events");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <Button
              variant="ghost"
              className="mb-6 gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-center mb-8">
              <h1 className="font-display text-4xl font-bold mb-4">
                Create New Event
              </h1>
              <p className="text-muted-foreground">
                Fill in the details below to create your event.
              </p>
            </div>

            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label>Event Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    required
                  />
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      value={formData.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      placeholder="10:00 AM"
                      required
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Attendees &#40;approx.&#41;</Label>
                  <Input
                    value={formData.attendees}
                    onChange={(e) => handleChange("attendees", e.target.value)}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => handleChange("category", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ticket Type */}
                <div className="space-y-2">
                  <Label>Ticket Type</Label>
                  <div className="flex gap-3">
                    <Badge
                      variant={
                        formData.ticketType === "free"
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => handleChange("ticketType", "free")}
                    >
                      {formData.ticketType === "free" && (
                        <Check className="w-3 h-3 mr-1" />
                      )}
                      Free
                    </Badge>
                    <Badge
                      variant={
                        formData.ticketType === "paid"
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => handleChange("ticketType", "paid")}
                    >
                      {formData.ticketType === "paid" && (
                        <Check className="w-3 h-3 mr-1" />
                      )}
                      Paid
                    </Badge>
                  </div>
                </div>

                {/* Price */}
                {formData.ticketType === "paid" && (
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        handleChange("price", e.target.value)
                      }
                      required
                    />
                  </div>
                )}

                {/* Image */}
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CreateEvent;
