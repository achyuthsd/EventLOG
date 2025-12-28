export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  ticketType: "free" | "paid";
  price?: number;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    description: "Join us for three days of incredible live music featuring top artists from around the world. Food, drinks, and good vibes included!",
    date: "Aug 15, 2024",
    time: "4:00 PM",
    location: "Central Park, New York City",
    category: "music",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
    attendees: 2450,
    ticketType: "paid",
    price: 89,
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    description: "Explore the future of technology with industry leaders. Keynotes, workshops, and networking opportunities await.",
    date: "Sep 20, 2024",
    time: "9:00 AM",
    location: "Convention Center, San Francisco",
    category: "tech",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    attendees: 890,
    ticketType: "paid",
    price: 249,
  },
  {
    id: "3",
    title: "Street Food Festival",
    description: "Taste the world's best street food from over 50 vendors. Live cooking demos and family-friendly activities all day.",
    date: "Jul 28, 2024",
    time: "11:00 AM",
    location: "Downtown Plaza, Austin",
    category: "food",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop",
    attendees: 1200,
    ticketType: "free",
  },
  {
    id: "4",
    title: "Startup Pitch Night",
    description: "Watch 10 promising startups pitch to a panel of investors. Network with founders and entrepreneurs.",
    date: "Aug 5, 2024",
    time: "6:30 PM",
    location: "The Hub, Chicago",
    category: "business",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop",
    attendees: 320,
    ticketType: "free",
  },
  {
    id: "5",
    title: "Marathon for Charity",
    description: "Run for a cause! Join thousands in this annual charity marathon supporting local communities.",
    date: "Oct 12, 2024",
    time: "7:00 AM",
    location: "City Center, Boston",
    category: "sports",
    image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&auto=format&fit=crop",
    attendees: 5600,
    ticketType: "paid",
    price: 45,
  },
  {
    id: "6",
    title: "Contemporary Art Exhibition",
    description: "Discover works by emerging artists pushing the boundaries of contemporary art. Guided tours available.",
    date: "Aug 22, 2024",
    time: "10:00 AM",
    location: "Modern Art Gallery, Los Angeles",
    category: "art",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&auto=format&fit=crop",
    attendees: 450,
    ticketType: "paid",
    price: 25,
  },
];

export const categories = [
  { id: "music", name: "Music", icon: "🎵" },
  { id: "tech", name: "Tech", icon: "💻" },
  { id: "education", name: "Education", icon: "🎓" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "art", name: "Art & Culture", icon: "🎨" },
  { id: "other", name: "Other", icon: "➡️" },
];