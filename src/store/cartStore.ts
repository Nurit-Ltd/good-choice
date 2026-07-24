import { CartItem } from "@/types";

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export const initialCartState: CartState = {
  items: [],
  isOpen: false,
};
