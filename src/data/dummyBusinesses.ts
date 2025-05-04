
export interface Business {
  id: string;
  name: string;
  type: string;
  services: string;
  priceRange: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  district: string;
  area: string;
  businessHours: string;
  photos: string[];
  ownerId?: string;
  createdAt: string;
}

export const dummyBusinesses: Business[] = [
  {
    id: "1",
    name: "Kolkata Tech Solutions",
    type: "Electronics",
    services: "Computer repair, Software installation, Networking",
    priceRange: "₹₹",
    phone: "+91 9876543210",
    email: "info@kolkatatech.com",
    website: "www.kolkatatech.com",
    address: "121, Park Street, Kolkata",
    district: "Kolkata",
    area: "Park Street",
    businessHours: "Mon-Sat: 10:00 AM - 8:00 PM",
    photos: [],
    createdAt: "2023-05-10T10:30:00Z"
  },
  {
    id: "2",
    name: "Sunshine Restaurant",
    type: "Restaurant",
    services: "Bengali cuisine, Chinese food, North Indian food",
    priceRange: "₹₹₹",
    phone: "+91 9876543211",
    email: "contact@sunshine.com",
    address: "45, Salt Lake, Sector 5",
    district: "North 24 Parganas",
    area: "Salt Lake",
    businessHours: "Daily: 11:00 AM - 11:00 PM",
    photos: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"],
    createdAt: "2023-06-15T14:20:00Z"
  },
  {
    id: "3",
    name: "Siliguri Medical Center",
    type: "Hospital",
    services: "General medicine, Surgery, Pediatrics, Gynecology",
    priceRange: "₹₹₹",
    phone: "+91 9876543212",
    email: "appointment@siligurimedical.com",
    website: "www.siligurimedical.com",
    address: "78, Hill Cart Road, Siliguri",
    district: "Darjeeling",
    area: "Siliguri",
    businessHours: "24/7",
    photos: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"],
    createdAt: "2023-03-22T09:15:00Z"
  },
  {
    id: "4",
    name: "Durgapur Home Services",
    type: "Electrician",
    services: "Electrical repairs, Wiring, Installation",
    priceRange: "₹",
    phone: "+91 9876543213",
    email: "support@durgapurhome.com",
    address: "13, City Center, Durgapur",
    district: "Paschim Bardhaman",
    area: "City Center",
    businessHours: "Mon-Sun: 8:00 AM - 9:00 PM",
    photos: [],
    createdAt: "2023-07-05T11:45:00Z"
  },
  {
    id: "5",
    name: "Malda Garments",
    type: "Clothing Store",
    services: "Traditional Bengali wear, Western clothing, Kids wear",
    priceRange: "₹₹",
    phone: "+91 9876543214",
    email: "info@maldagarments.com",
    address: "29, Main Road, English Bazar",
    district: "Malda",
    area: "English Bazar",
    businessHours: "Mon-Sat: 10:30 AM - 8:30 PM",
    photos: ["https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop"],
    createdAt: "2023-04-18T13:10:00Z"
  },
  {
    id: "6",
    name: "Howrah Legal Services",
    type: "Lawyer",
    services: "Property law, Family law, Civil cases",
    priceRange: "₹₹₹",
    phone: "+91 9876543215",
    email: "consult@howrahlegal.com",
    website: "www.howrahlegal.com",
    address: "56, Howrah Maidan, Howrah",
    district: "Howrah",
    area: "Howrah Maidan",
    businessHours: "Mon-Fri: 10:00 AM - 6:00 PM",
    photos: [],
    createdAt: "2023-08-30T15:30:00Z"
  }
];
