export interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description?: string;
  rating?: number;
  ratingCount?: number;
  isAvailable?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  icon: string;
  rating: number;
  ratingCount?: number;
  location: string;
  contactInfo?: string;
  paymentMobile?: string;
  isOpen: boolean;
  menu: MenuItem[];
  offers?: Offer[];
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RESTAURANTS } from '../data/mockData';

export type Role = 'student' | 'owner' | 'delivery' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  restaurantId?: string;
  avatar?: string;
  universityId?: string; // New field for ID
}

export interface CartItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  quantity: number;
  isOffer?: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isOffer?: boolean;
}

export interface Order {
  id: string;
  studentId: string;
  studentName: string;
  restaurantId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled' | 'rejected';
  createdAt: string;
  note?: string;
  paymentMethod?: 'cash' | 'online';
  paymentScreenshot?: string;
  // Delivery fields
  isDeliveryRequested?: boolean;
  deliveryFee?: number;
  deliveryPersonId?: string;
  deliveryStatus?: 'none' | 'pending' | 'accepted' | 'picked_up' | 'delivered';
}

export interface Offer {
  id: string;
  restaurantId: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  originalPrice?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  language: 'en' | 'ar';
  cart: CartItem[];
  restaurants: Restaurant[];
  orders: Order[];
  notifications: Notification[];
  offers: Offer[];
  favorites: string[];
  balance: number;
  isChatbotOpen: boolean;
  setUser: (user: User | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (lang: 'en' | 'ar') => void;
  setChatbotOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateMenuItem: (restaurantId: string, itemId: string, updatedItem: Partial<MenuItem>) => void;
  deleteMenuItem: (restaurantId: string, itemId: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  acceptDeliveryOrder: (orderId: string, deliveryPersonId: string) => void;
  updateDeliveryStatus: (orderId: string, status: Order['deliveryStatus']) => void;
  markNotificationAsRead: (id: string) => void;
  rateRestaurant: (restaurantId: string, rating: number) => void;
  rateMenuItem: (restaurantId: string, itemId: string, rating: number) => void;
  addOffer: (offer: Omit<Offer, 'id'>) => void;
  deleteOffer: (id: string) => void;
  toggleFavorite: (itemId: string) => void;
  updateRestaurantProfile: (restaurantId: string, updates: Partial<Restaurant>) => void;
  deleteRestaurant: (restaurantId: string) => void;
  addFunds: (amount: number) => void;
  updateUserProfile: (updates: Partial<User>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      theme: 'light',
      language: 'ar',
      cart: [],
      restaurants: RESTAURANTS as Restaurant[],
      orders: [],
      notifications: [],
      offers: [],
      favorites: [],
      balance: 1000,
      isChatbotOpen: false,
      setUser: (user) => set({ user }),
      updateUserProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      },
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setChatbotOpen: (isChatbotOpen) => set({ isChatbotOpen }),
      addToCart: (item) => set((state) => {
        const existing = state.cart.find(i => i.id === item.id);
        if (existing) {
          return {
            cart: state.cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
          };
        }
        return { cart: [...state.cart, item] };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(i => i.id !== id)
      })),
      clearCart: () => set({ cart: [] }),
      updateMenuItem: (restaurantId, itemId, updatedItem) => set((state) => ({
        restaurants: state.restaurants.map(restaurant => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              menu: restaurant.menu.map(item => 
                item.id === itemId ? { ...item, ...updatedItem } : item
              )
            };
          }
          return restaurant;
        })
      })),
      deleteMenuItem: (restaurantId, itemId) => set((state) => ({
        restaurants: state.restaurants.map(restaurant => {
          if (restaurant.id === restaurantId) {
            return {
              ...restaurant,
              menu: restaurant.menu.filter(item => item.id !== itemId)
            };
          }
          return restaurant;
        })
      })),
      addOrder: (orderData) => {
        const orderId = Math.random().toString(36).substring(2, 9);
        const newOrder = {
          ...orderData,
          id: orderId,
          status: 'pending' as const,
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => {
          const order = state.orders.find(o => o.id === orderId);
          if (!order) return state;

          const newOrders = state.orders.map(o => 
            o.id === orderId ? { ...o, status } : o
          );
          
          return { orders: newOrders };
        });
      },
      acceptDeliveryOrder: (orderId, deliveryPersonId) => {
        set((state) => {
          const newOrders = state.orders.map(o => 
            o.id === orderId ? { ...o, deliveryPersonId, deliveryStatus: 'accepted' as const } : o
          );
          return { orders: newOrders };
        });
      },
      updateDeliveryStatus: (orderId, deliveryStatus) => {
        set((state) => {
          const newOrders = state.orders.map(o => 
            o.id === orderId ? { ...o, deliveryStatus } : o
          );
          return { orders: newOrders };
        });
      },
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),
      rateRestaurant: (restaurantId, rating) => set((state) => ({
        restaurants: state.restaurants.map(r => {
          if (r.id === restaurantId) {
            const currentCount = r.ratingCount || 0;
            const newCount = currentCount + 1;
            const newRating = ((r.rating * currentCount) + rating) / newCount;
            return { ...r, rating: Number(newRating.toFixed(1)), ratingCount: newCount };
          }
          return r;
        })
      })),
      rateMenuItem: (restaurantId, itemId, rating) => set((state) => ({
        restaurants: state.restaurants.map(r => {
          if (r.id === restaurantId) {
            return {
              ...r,
              menu: r.menu.map(item => {
                if (item.id === itemId) {
                  const currentCount = item.ratingCount || 0;
                  const currentRating = item.rating || 0;
                  const newCount = currentCount + 1;
                  const newRating = ((currentRating * currentCount) + rating) / newCount;
                  return { ...item, rating: Number(newRating.toFixed(1)), ratingCount: newCount };
                }
                return item;
              })
            };
          }
          return r;
        })
      })),
      addOffer: (offerData) => set((state) => ({
        offers: [
          { ...offerData, id: Math.random().toString(36).substring(2, 9) },
          ...state.offers
        ]
      })),
      deleteOffer: (id) => set((state) => ({
        offers: state.offers.filter(o => o.id !== id)
      })),
      toggleFavorite: (itemId) => set((state) => ({
        favorites: state.favorites.includes(itemId)
          ? state.favorites.filter(id => id !== itemId)
          : [...state.favorites, itemId]
      })),
      updateRestaurantProfile: (restaurantId, updates) => {
        set((state) => ({
          restaurants: state.restaurants.map(r => 
            r.id === restaurantId ? { ...r, ...updates } : r
          )
        }));
      },
      deleteRestaurant: (restaurantId) => {
        set((state) => ({
          restaurants: state.restaurants.filter(r => r.id !== restaurantId)
        }));
      },
      addFunds: (amount) => set((state) => ({ balance: state.balance + amount }))
    }),
    {
      name: 'food-hub-storage-v10', // Changed to v10 to force update and clear old state
    }
  )
);
