
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  role: UserRole;
  password?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
  category: string;
}

export interface Stylist {
  id: string;
  name: string;
  specialization: string;
  availability: {
    start: string; // "09:00"
    end: string;   // "18:00"
  };
  image: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  stylistId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  createdAt: string;
  // Denormalized for easy display
  userName: string;
  serviceName: string;
  stylistName: string;
  userPhone: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}
