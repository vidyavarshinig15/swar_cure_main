export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: MusicTrack[];
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  coverImage: string;
  duration: number; // in seconds
  category: string;
  frequency?: number; // in Hz
  benefits: string[];
  source: 'local' | 'spotify' | 'youtube';
}

// SwarCure API Service
// This file contains all API service functions for the SwarCure wellness application

// Types and Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  abhaId?: string; // ABDM Health ID
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  profilePicture?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  qualifications: string[];
  languages: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  profileImage: string;
  consultationFee: number;
  availableDays: string[];
  appointmentTypes: ('online' | 'in-person')[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  type: 'online' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  symptoms?: string;
  notes?: string;
  meetingLink?: string;
  prescriptionId?: string;
  paymentId?: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes?: string;
  }[];
  therapy: {
    name: string;
    instructions: string;
    duration: string;
    frequency: string;
  }[];
  notes?: string;
  followUpDate?: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  date: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  read: boolean;
  date: string;
  action?: {
    label: string;
    url: string;
  };
}

// Authentication API
export const authApi = {
  // Login user
  login: async (email: string, password: string): Promise<User> => {
    // In a real app, this would make an API call to your backend
    // Mock implementation for hackathon
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful authentication
        if (email && password) {
          const user = {
            id: '1',
            name: 'John Doe',
            email: email,
          };
          
          // Store auth token in localStorage
          localStorage.setItem('authToken', 'sample-auth-token');
          localStorage.setItem('userId', user.id);
          
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
  
  // Register new user
  register: async (email: string, password: string, name: string): Promise<User> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: '1',
          name: name,
          email: email,
        };
        
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'sample-auth-token');
        localStorage.setItem('userId', user.id);
        
        resolve(user);
      }, 800);
    });
  },
  
  // Logout user
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Remove auth data from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        
        resolve();
      }, 300);
    });
  },
  
  // Get current user info
  getCurrentUser: async (): Promise<User> => {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
          const email = localStorage.getItem('userEmail') || '';
          const name = localStorage.getItem('userName') || 'User';
          
          resolve({
            id: '1',
            name: name,
            email: email,
          });
        } else {
          reject(new Error('User not authenticated'));
        }
      }, 500);
    });
  },
  
  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentName = localStorage.getItem('userName') || 'User';
        const currentEmail = localStorage.getItem('userEmail') || '';
        
        const updatedUser = {
          id: '1',
          name: userData.name || currentName,
          email: userData.email || currentEmail,
          phone: userData.phone,
          dateOfBirth: userData.dateOfBirth,
          address: userData.address,
          city: userData.city,
          state: userData.state,
          pincode: userData.pincode,
        };
        
        if (userData.name) {
          localStorage.setItem('userName', userData.name);
        }
        
        if (userData.email) {
          localStorage.setItem('userEmail', userData.email);
        }
        
        resolve(updatedUser);
      }, 600);
    });
  }
};

// Doctors API
export const doctorsApi = {
  // Get all doctors
  getAllDoctors: async (): Promise<Doctor[]> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Dr. Ananya Sharma',
            specialization: 'Sound Therapy Specialist',
            experience: 12,
            qualifications: ['MBBS', 'MD (Psychiatry)', 'Certified Sound Therapist'],
            languages: ['English', 'Hindi', 'Tamil'],
            bio: 'Dr. Sharma specializes in treating anxiety and depression through therapeutic sound frequencies.',
            rating: 4.8,
            reviewCount: 124,
            profileImage: 'https://i.pravatar.cc/150?img=28',
            consultationFee: 1200,
            availableDays: ['Monday', 'Wednesday', 'Friday'],
            appointmentTypes: ['online', 'in-person'],
          },
          {
            id: '2',
            name: 'Dr. Rajiv Mehta',
            specialization: 'Music Therapy Expert',
            experience: 8,
            qualifications: ['PhD in Music Therapy', 'Clinical Psychologist'],
            languages: ['English', 'Hindi', 'Gujarati'],
            bio: 'Dr. Mehta uses elements of Indian classical music to treat chronic pain and insomnia.',
            rating: 4.6,
            reviewCount: 92,
            profileImage: 'https://i.pravatar.cc/150?img=57',
            consultationFee: 1000,
            availableDays: ['Tuesday', 'Thursday', 'Saturday'],
            appointmentTypes: ['online', 'in-person'],
          },
          {
            id: '3',
            name: 'Dr. Meera Singh',
            specialization: 'Neurological Sound Therapy',
            experience: 15,
            qualifications: ['MD (Neurology)', 'Sound Therapy Certification'],
            languages: ['English', 'Hindi', 'Bengali'],
            bio: 'Dr. Singh focuses on neurological disorders and uses sound frequencies to stimulate brain healing.',
            rating: 4.9,
            reviewCount: 156,
            profileImage: 'https://i.pravatar.cc/150?img=5',
            consultationFee: 1500,
            availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
            appointmentTypes: ['online'],
          },
        ]);
      }, 800);
    });
  },
  
  // Get doctor by ID
  getDoctorById: async (id: string): Promise<Doctor> => {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const doctors = [
          {
            id: '1',
            name: 'Dr. Ananya Sharma',
            specialization: 'Sound Therapy Specialist',
            experience: 12,
            qualifications: ['MBBS', 'MD (Psychiatry)', 'Certified Sound Therapist'],
            languages: ['English', 'Hindi', 'Tamil'],
            bio: 'Dr. Sharma specializes in treating anxiety and depression through therapeutic sound frequencies.',
            rating: 4.8,
            reviewCount: 124,
            profileImage: 'https://i.pravatar.cc/150?img=28',
            consultationFee: 1200,
            availableDays: ['Monday', 'Wednesday', 'Friday'],
            appointmentTypes: ['online', 'in-person'],
          },
          {
            id: '2',
            name: 'Dr. Rajiv Mehta',
            specialization: 'Music Therapy Expert',
            experience: 8,
            qualifications: ['PhD in Music Therapy', 'Clinical Psychologist'],
            languages: ['English', 'Hindi', 'Gujarati'],
            bio: 'Dr. Mehta uses elements of Indian classical music to treat chronic pain and insomnia.',
            rating: 4.6,
            reviewCount: 92,
            profileImage: 'https://i.pravatar.cc/150?img=57',
            consultationFee: 1000,
            availableDays: ['Tuesday', 'Thursday', 'Saturday'],
            appointmentTypes: ['online', 'in-person'],
          },
          {
            id: '3',
            name: 'Dr. Meera Singh',
            specialization: 'Neurological Sound Therapy',
            experience: 15,
            qualifications: ['MD (Neurology)', 'Sound Therapy Certification'],
            languages: ['English', 'Hindi', 'Bengali'],
            bio: 'Dr. Singh focuses on neurological disorders and uses sound frequencies to stimulate brain healing.',
            rating: 4.9,
            reviewCount: 156,
            profileImage: 'https://i.pravatar.cc/150?img=5',
            consultationFee: 1500,
            availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
            appointmentTypes: ['online'],
          },
        ];
        
        const doctor = doctors.find(doc => doc.id === id);
        
        if (doctor) {
          resolve(doctor);
        } else {
          reject(new Error('Doctor not found'));
        }
      }, 500);
    });
  },
  
  // Get available time slots for a doctor on a specific date
  getAvailableSlots: async (doctorId: string, date: Date): Promise<string[]> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate random available slots for the selected date
        const slots = [];
        const startHour = 9; // 9 AM
        const endHour = 17; // 5 PM
        
        for (let hour = startHour; hour < endHour; hour++) {
          // Add slots every 30 minutes
          const morning = `${hour}:00`;
          const afternoon = `${hour}:30`;
          
          // Randomize availability (some slots will be available, some won't)
          if (Math.random() > 0.3) slots.push(morning);
          if (Math.random() > 0.3) slots.push(afternoon);
        }
        
        resolve(slots);
      }, 500);
    });
  },
};

// Appointments API
export const appointmentsApi = {
  // Book a new appointment
  bookAppointment: async (appointmentData: {
    doctorId: string;
    date: string;
    time: string;
    type: 'online' | 'in-person';
    symptoms?: string;
  }): Promise<Appointment> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointment: Appointment = {
          id: `app-${Date.now()}`,
          doctorId: appointmentData.doctorId,
          patientId: localStorage.getItem('userId') || '1',
          date: appointmentData.date,
          time: appointmentData.time,
          type: appointmentData.type,
          status: 'scheduled',
          symptoms: appointmentData.symptoms,
          meetingLink: appointmentData.type === 'online' ? 'https://meet.swarcure.com/12345' : undefined,
        };
        
        resolve(appointment);
      }, 800);
    });
  },
  
  // Get user appointments
  getUserAppointments: async (): Promise<Appointment[]> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get current date for creating relative dates
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);
        
        const lastWeek = new Date(now);
        lastWeek.setDate(now.getDate() - 7);
        
        resolve([
          {
            id: 'app-1',
            doctorId: '1',
            patientId: '1',
            date: tomorrow.toISOString().split('T')[0],
            time: '10:00',
            type: 'online',
            status: 'scheduled',
            symptoms: 'Anxiety and sleep issues',
            meetingLink: 'https://meet.swarcure.com/12345',
          },
          {
            id: 'app-2',
            doctorId: '3',
            patientId: '1',
            date: nextWeek.toISOString().split('T')[0],
            time: '15:30',
            type: 'online',
            status: 'scheduled',
            symptoms: 'Chronic migraines',
            meetingLink: 'https://meet.swarcure.com/67890',
          },
          {
            id: 'app-3',
            doctorId: '2',
            patientId: '1',
            date: lastWeek.toISOString().split('T')[0],
            time: '11:00',
            type: 'in-person',
            status: 'completed',
            symptoms: 'Stress and sleep issues',
            notes: 'Patient responded well to the Raag Malkauns session',
            prescriptionId: 'presc-1',
          },
        ]);
      }, 700);
    });
  },
  
  // Cancel an appointment
  cancelAppointment: async (appointmentId: string): Promise<void> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would make an API call to cancel the appointment
        resolve();
      }, 600);
    });
  },
  
  // Reschedule an appointment
  rescheduleAppointment: async (appointmentId: string, newDate: string, newTime: string): Promise<Appointment> => {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real implementation, this would make an API call to reschedule
        appointmentsApi.getUserAppointments()
          .then(appointments => {
            const appointment = appointments.find(app => app.id === appointmentId);
            if (appointment) {
              appointment.date = newDate;
              appointment.time = newTime;
              resolve(appointment);
            } else {
              reject(new Error('Appointment not found'));
            }
          });
      }, 700);
    });
  },
};

// Prescriptions API
export const prescriptionsApi = {
  // Get user prescriptions
  getUserPrescriptions: async (): Promise<Prescription[]> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'presc-1',
            appointmentId: 'app-3',
            doctorId: '2',
            patientId: '1',
            date: '2023-10-15',
            medications: [
              {
                name: 'Anxiety Support Supplement',
                dosage: '1 tablet',
                frequency: 'twice daily',
                duration: '30 days',
                notes: 'Take after meals',
              },
            ],
            therapy: [
              {
                name: 'Raag Malkauns',
                instructions: 'Listen to the attached sound therapy track',
                duration: '20 minutes',
                frequency: 'daily before sleep',
              },
              {
                name: 'Deep Breathing Exercise',
                instructions: 'Follow the guided breathing pattern with the provided audio',
                duration: '10 minutes',
                frequency: 'twice daily - morning and evening',
              },
            ],
            notes: 'Follow up in 2 weeks to assess progress. Continue to maintain sleep diary.',
            followUpDate: '2023-10-29',
          },
        ]);
      }, 800);
    });
  },
  
  // Get prescription by ID
  getPrescriptionById: async (prescriptionId: string): Promise<Prescription> => {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const prescriptions = [
          {
            id: 'presc-1',
            appointmentId: 'app-3',
            doctorId: '2',
            patientId: '1',
            date: '2023-10-15',
            medications: [
              {
                name: 'Anxiety Support Supplement',
                dosage: '1 tablet',
                frequency: 'twice daily',
                duration: '30 days',
                notes: 'Take after meals',
              },
            ],
            therapy: [
              {
                name: 'Raag Malkauns',
                instructions: 'Listen to the attached sound therapy track',
                duration: '20 minutes',
                frequency: 'daily before sleep',
              },
              {
                name: 'Deep Breathing Exercise',
                instructions: 'Follow the guided breathing pattern with the provided audio',
                duration: '10 minutes',
                frequency: 'twice daily - morning and evening',
              },
            ],
            notes: 'Follow up in 2 weeks to assess progress. Continue to maintain sleep diary.',
            followUpDate: '2023-10-29',
          },
        ];
        
        const prescription = prescriptions.find(p => p.id === prescriptionId);
        
        if (prescription) {
          resolve(prescription);
        } else {
          reject(new Error('Prescription not found'));
        }
      }, 500);
    });
  },
};

// Notifications API
export const notificationsApi = {
  // Get user notifications
  getUserNotifications: async (): Promise<Notification[]> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'notif-1',
            userId: '1',
            title: 'Therapy Session Reminder',
            description: 'You haven\'t completed your evening therapy session yet.',
            type: 'reminder',
            read: false,
            date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            action: {
              label: 'Start Session',
              url: '/music-search',
            },
          },
          {
            id: 'notif-2',
            userId: '1',
            title: 'Upcoming Appointment',
            description: 'You have an appointment with Dr. Ananya Sharma tomorrow at 10:00 AM.',
            type: 'appointment',
            read: false,
            date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            action: {
              label: 'View Details',
              url: '/appointments',
            },
          },
          {
            id: 'notif-3',
            userId: '1',
            title: 'New Workshop Available',
            description: 'Join our workshop on "Healing through Indian Classical Music" next week.',
            type: 'event',
            read: true,
            date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            action: {
              label: 'View Details',
              url: '/workshops',
            },
          },
        ]);
      }, 600);
    });
  },
  
  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<void> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would make an API call to update the notification status
        resolve();
      }, 300);
    });
  },
  
  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, this would make an API call to update all notifications
        resolve();
      }, 400);
    });
  },
};

// Payment API
export const paymentApi = {
  // Create payment
  createPayment: async (appointmentId: string, amount: number): Promise<Payment> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const payment: Payment = {
          id: `pay-${Date.now()}`,
          appointmentId,
          amount,
          currency: 'INR',
          status: 'pending',
          paymentMethod: 'card',
          date: new Date().toISOString(),
        };
        
        resolve(payment);
      }, 500);
    });
  },
  
  // Process payment
  processPayment: async (paymentId: string, paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
  }): Promise<Payment> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would call a payment gateway
        const payment: Payment = {
          id: paymentId,
          appointmentId: 'app-1', // Mock appointment ID
          amount: 1200, // Mock amount
          currency: 'INR',
          status: 'completed',
          paymentMethod: 'card',
          transactionId: `txn-${Date.now()}`,
          date: new Date().toISOString(),
        };
        
        resolve(payment);
      }, 1500); // Longer delay to simulate payment processing
    });
  },
  
  // Get payment by ID
  getPaymentById: async (paymentId: string): Promise<Payment> => {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (paymentId) {
          const payment: Payment = {
            id: paymentId,
            appointmentId: 'app-1',
            amount: 1200,
            currency: 'INR',
            status: 'completed',
            paymentMethod: 'card',
            transactionId: 'txn-12345',
            date: new Date().toISOString(),
          };
          
          resolve(payment);
        } else {
          reject(new Error('Payment not found'));
        }
      }, 400);
    });
  },
  
  // Get user payments
  getUserPayments: async (): Promise<Payment[]> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'pay-1',
            appointmentId: 'app-1',
            amount: 1200,
            currency: 'INR',
            status: 'completed',
            paymentMethod: 'card',
            transactionId: 'txn-12345',
            date: '2023-10-25T10:30:00Z',
          },
          {
            id: 'pay-2',
            appointmentId: 'app-3',
            amount: 1000,
            currency: 'INR',
            status: 'completed',
            paymentMethod: 'upi',
            transactionId: 'txn-67890',
            date: '2023-10-15T11:15:00Z',
          },
        ]);
      }, 700);
    });
  },
};

// Webhooks for external integrations
export const webhookHandlers = {
  // Handle appointment reminder webhooks
  handleReminderWebhook: async (data: any): Promise<void> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Received reminder webhook:', data);
        resolve();
      }, 200);
    });
  },
  
  // Handle payment webhook
  handlePaymentWebhook: async (data: any): Promise<void> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Received payment webhook:', data);
        resolve();
      }, 200);
    });
  },
};

export const musicApi = {
  getAllMusicTracks: async (): Promise<MusicTrack[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Classical Instrumental Sad Music',
            artist: 'Unknown',
            url: '/src/music/classical-instrumental-sad-music-300916.mp3',
            coverImage: 'https://i.pravatar.cc/150?img=1',
            duration: 180, // Example duration in seconds
            category: 'Classical',
            benefits: ['Relaxation', 'Mood Enhancement'],
            source: 'local',
          },
          {
            id: '2',
            title: 'Indian Classical Flute & Tabla',
            artist: 'Unknown',
            url: '/src/music/indian-classical-flute-amp-tabla-140472.mp3',
            coverImage: 'https://i.pravatar.cc/150?img=2',
            duration: 240, // Example duration in seconds
            category: 'Indian Classical',
            benefits: ['Meditation', 'Focus'],
            source: 'local',
          },
          {
            id: '3',
            title: 'Rainy Day Relaxation',
            artist: 'Nature Sounds',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Example external URL
            coverImage: 'https://i.pravatar.cc/150?img=3',
            duration: 200,
            category: 'Nature Sounds',
            benefits: ['Sleep', 'Stress Relief'],
            source: 'youtube',
          },
        ]);
      }, 500);
    });
  },

  getPlaylists: async (): Promise<Playlist[]> => {
    return new Promise(async (resolve) => {
      const allTracks = await musicApi.getAllMusicTracks(); // Get all tracks to create playlists
      setTimeout(() => {
        resolve([
          {
            id: 'playlist-1',
            name: 'Morning Meditation',
            description: 'Calm sounds to start your day.',
            tracks: [allTracks[1], allTracks[2]], // Indian Classical, Rainy Day
          },
          {
            id: 'playlist-2',
            name: 'Deep Focus',
            description: 'Music to help you concentrate.',
            tracks: [allTracks[0]], // Classical Instrumental
          },
          {
            id: 'playlist-3',
            name: 'Sleep Aid',
            description: 'Relaxing tunes for a peaceful night.',
            tracks: [allTracks[2], allTracks[0]], // Rainy Day, Classical Instrumental
          },
        ]);
      }, 600);
    });
  },
};

export default {
  authApi,
  doctorsApi,
  appointmentsApi,
  prescriptionsApi,
  notificationsApi,
  paymentApi,
  webhookHandlers,
  musicApi,
};