import { Event } from "../data/events";

const API_URL = "https://eventlog-temv.onrender.com/api/events"; // change port if needed

interface BackendEvent {
  _id: string;
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

interface EventsResponse {
  suc: string;
  data: BackendEvent[];
}

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const json: EventsResponse = await response.json();

  return json.data.map((e) => ({
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
  }));
};



export const fetchEventById = async (id: string): Promise<Event> => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  const json = await res.json();

  const e = json.data;

  return {
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
};
