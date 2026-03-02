export interface Resource {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  address: string;
  cost: string;
  tags: string[];
  image: string;
  latitude: number;
  longitude: number;
  description: string;
  // For calendar: "wed" | "sat" | "mon-wed" | "YYYY-MM-DD"
  schedule: string;
}

export const RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Sammamish Farmers Market",
    type: "Event",
    date: "Every Wednesday",
    time: "3:00 PM - 8:00 PM",
    location: "Upper Sammamish Commons",
    address: "801 228th Ave SE, Sammamish, WA 98075",
    cost: "Free Entry",
    tags: ["Community", "Food", "Family"],
    image: "https://images.unsplash.com/photo-1514583079045-e928a4732ade?w=800",
    latitude: 47.601448,
    longitude: -122.037971,
    description: "Every Wednesday afternoon, the Sammamish Commons transforms into a vibrant open-air market. Browse fresh local produce, handcrafted goods, and artisan foods from vendors across the Pacific Northwest. A beloved weekly tradition for families, neighbors, and food lovers alike.",
    schedule: "wed",
  },
  {
    id: 2,
    title: "Volunteer @ Sammamish Landing",
    type: "Volunteering",
    date: "Saturday, Feb 2, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Sammamish Landing",
    address: "4607 E Lake Sammamish Pkwy NE, Sammamish, WA 98074",
    cost: "Free",
    tags: ["Community", "Environment", "Volunteering"],
    image: "https://images.unsplash.com/photo-1652971876875-05db98fab376?w=800",
    latitude: 47.650410,
    longitude: -122.089241,
    description: "Join fellow community members for a morning of environmental stewardship at Sammamish Landing. Volunteers help with trail maintenance, shoreline cleanup, and habitat restoration. All skill levels welcome — gloves and tools provided. A great way to give back and connect with nature.",
    schedule: "2026-02-02",
  },
  {
    id: 3,
    title: "Coffee with Council",
    type: "Event",
    date: "Thursday, Jan 28, 2026",
    time: "10:00 AM - 11:30 AM",
    location: "Sammamish City Hall",
    address: "801 228th Ave SE, Sammamish, WA 98075",
    cost: "Free Entry",
    tags: ["Community", "Government", "Networking"],
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800",
    latitude: 47.601448,
    longitude: -122.037971,
    description: "An informal meet-and-greet with Sammamish City Council members over coffee. Residents are encouraged to share ideas, ask questions, and discuss local issues in a relaxed setting. Your voice shapes our community — come say hello to your representatives.",
    schedule: "2026-01-28",
  },
  {
    id: 4,
    title: "Youth Soccer Program",
    type: "Program",
    date: "Every Saturday",
    time: "10:00 AM - 12:00 PM",
    location: "Marymoor Park Field E",
    address: "6046 W Lake Sammamish Pkwy NE, Redmond, WA 98052",
    cost: "$50/month",
    tags: ["Youth", "Sports", "Recreation"],
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    latitude: 47.661770,
    longitude: -122.125977,
    description: "A weekly recreational soccer program for youth ages 6–14 at the beautiful Marymoor Park fields. Led by experienced coaches, the program focuses on skill development, teamwork, and sportsmanship in a fun and supportive environment. Registration open year-round.",
    schedule: "sat",
  },
  {
    id: 5,
    title: "iCode Sammamish Intro to Coding",
    type: "Workshop",
    date: "Friday, Feb 5, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "iCode Sammamish",
    address: "22840 NE 8th St, Sammamish, WA 98074",
    cost: "$15",
    tags: ["Arts", "Education", "Community"],
    image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?w=800",
    latitude: 47.616653,
    longitude: -122.034168,
    description: "A beginner-friendly two-hour coding workshop introducing fundamental programming concepts using hands-on projects. Perfect for students and adults with no prior experience. Participants will build their first interactive program and leave with resources to keep learning.",
    schedule: "2026-02-05",
  },
  {
    id: 6,
    title: "Senior Fitness Classes",
    type: "Program",
    date: "Mondays & Wednesdays",
    time: "9:00 AM - 10:00 AM",
    location: "Sammamish YMCA",
    address: "831 228th Ave SE, Sammamish, WA 98075",
    cost: "Free",
    tags: ["Seniors", "Health", "Fitness"],
    image: "https://images.unsplash.com/photo-1764173040171-57f79264b358?w=800",
    latitude: 47.616653,
    longitude: -122.034168,
    description: "Low-impact fitness classes designed specifically for adults 55 and older. Led by certified instructors, sessions include gentle stretching, balance exercises, and light cardio to improve mobility and overall wellbeing. No registration required — just show up!",
    schedule: "mon-wed",
  },
];
