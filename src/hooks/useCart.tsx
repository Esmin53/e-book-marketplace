import { create } from "zustand";
import {
    createJSONStorage,
    persist,
  } from 'zustand/middleware'
  

export type CartItem = {
    book: {
        _id: string,
        title: string,
        cover_image: string,
        author: string,
        price: number,
    } 
}

type CartState = {
    items: CartItem[],
    addItem: (book: {
        _id: string,
        title: string,
        cover_image: string,
        author: string,
        price: number,
    } ) => void,
    removeItem: (bookId: string) => void,
    clearCart: () => void
}

export const useCart = create<CartState>()(
    persist(
      (set) => ({
        items: [],
        addItem: (book) =>
          set((state) => {
            return { items: [...state.items, { book }] }
          }),
        removeItem: (_id) =>
          set((state) => ({
            items: state.items.filter(
              (item) => item.book._id !== _id
            ),
          })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )