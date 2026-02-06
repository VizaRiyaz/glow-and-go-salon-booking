
import { User, Service, Stylist, Appointment, AppointmentStatus } from './types';
import { INITIAL_SERVICES, INITIAL_STYLISTS } from './constants';

const DB_KEYS = {
  USERS: 'salon_users',
  SERVICES: 'salon_services',
  STYLISTS: 'salon_stylists',
  APPOINTMENTS: 'salon_appointments',
  SESSION: 'salon_session'
};

const get = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const set = <T,>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const DB = {
  users: {
    getAll: () => get<User[]>(DB_KEYS.USERS, [
      { id: 'admin-1', name: 'Admin User', email: 'admin@glowgo.com', phone: '0000000000', role: 'admin', password: 'admin' }
    ]),
    save: (users: User[]) => set(DB_KEYS.USERS, users),
    add: (user: User) => {
      const users = DB.users.getAll();
      DB.users.save([...users, user]);
    }
  },
  services: {
    getAll: () => get<Service[]>(DB_KEYS.SERVICES, INITIAL_SERVICES),
    save: (services: Service[]) => set(DB_KEYS.SERVICES, services),
    delete: (id: string) => {
      const services = DB.services.getAll().filter(s => s.id !== id);
      DB.services.save(services);
    }
  },
  stylists: {
    getAll: () => get<Stylist[]>(DB_KEYS.STYLISTS, INITIAL_STYLISTS),
    save: (stylists: Stylist[]) => set(DB_KEYS.STYLISTS, stylists),
    delete: (id: string) => {
      const stylists = DB.stylists.getAll().filter(s => s.id !== id);
      DB.stylists.save(stylists);
    }
  },
  appointments: {
    getAll: () => get<Appointment[]>(DB_KEYS.APPOINTMENTS, []),
    save: (appointments: Appointment[]) => set(DB_KEYS.APPOINTMENTS, appointments),
    add: (appointment: Appointment) => {
      const all = DB.appointments.getAll();
      DB.appointments.save([...all, appointment]);
    },
    updateStatus: (id: string, status: AppointmentStatus) => {
      const all = DB.appointments.getAll().map(a => a.id === id ? { ...a, status } : a);
      DB.appointments.save(all);
    }
  },
  session: {
    get: () => get<User | null>(DB_KEYS.SESSION, null),
    set: (user: User | null) => set(DB_KEYS.SESSION, user),
    clear: () => localStorage.removeItem(DB_KEYS.SESSION)
  }
};
