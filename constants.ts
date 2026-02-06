
import { Service, Stylist, Review } from './types';

export interface ServiceWithImage extends Service {
  image: string;
}

export const INITIAL_SERVICES: (Service & { image: string })[] = [
  { 
    id: 's1', 
    name: 'Master Scissor Cut', 
    price: 800, 
    duration: 45, 
    description: 'Precision artisan cutting using high-grade steel scissors for a natural flow.', 
    category: 'Haircut',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 's2', 
    name: 'Royal Beard Sculpt', 
    price: 450, 
    duration: 30, 
    description: 'Complete beard shaping and alignment with luxury oils and hot towel finish.', 
    category: 'Beard Trim',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 's3', 
    name: 'Gold Glow Facial', 
    price: 1800, 
    duration: 60, 
    description: 'Deep cleansing treatment designed to revitalize weathered skin for a fresh radiance.', 
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 's4', 
    name: 'Keratin Revive Spa', 
    price: 2200, 
    duration: 90, 
    description: 'Intense hydration and protein therapy to restore hair strength and mirror-like shine.', 
    category: 'Hair Spa',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 's5', 
    name: 'Artisan Global Color', 
    price: 3500, 
    duration: 150, 
    description: 'Organic color palette application for sophisticated, multi-dimensional hair tones.', 
    category: 'Coloring',
    image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 's6', 
    name: 'Elite Event Styling', 
    price: 1200, 
    duration: 60, 
    description: 'Red-carpet ready styling, including signature pompadours and textured finishes.', 
    category: 'Styling',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800'
  },
];

export const INITIAL_STYLISTS: Stylist[] = [
  { id: 'st1', name: 'Arjun Varma', specialization: 'Master Artisan & Scissor Expert', availability: { start: '09:00', end: '17:00' }, image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 'st2', name: 'Rohan Malhotra', specialization: 'Elite Barber & Sculpting Specialist', availability: { start: '10:00', end: '18:00' }, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: 'st3', name: 'Priya Sharma', specialization: 'Luxury Stylist & Color Artist', availability: { start: '08:00', end: '16:00' }, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300' },
];

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'Vikram Singh', rating: 5, comment: 'Simply the best grooming experience in the city. Arjun is a true master with the scissors.', avatar: 'https://i.pravatar.cc/150?u=vikram' },
  { id: 'r2', name: 'Aman Gupta', rating: 5, comment: 'The beard sculpt is a ritual here. Perfection in every line.', avatar: 'https://i.pravatar.cc/150?u=aman' },
  { id: 'r3', name: 'Ishita Roy', rating: 4, comment: 'The ambiance and service quality are unparalleled. Highly recommend the hair spa.', avatar: 'https://i.pravatar.cc/150?u=ishita' },
];
