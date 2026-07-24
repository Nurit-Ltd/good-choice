"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";
import { CartItem, Product } from "@/types";
import { APP_CONSTANTS } from "@/config/constants";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cart-updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cart-updated", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.CART) || "[]";
}

function getServerSnapshot() {
  return "[]";
}

export function useCart() {
  const rawCart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const items: CartItem[] = useMemo(() => {
    try {
      return JSON.parse(rawCart);
    } catch {
      return [];
    }
  }, [rawCart]);

  const saveCart = useCallback((newItems: CartItem[]) => {
    localStorage.setItem(
      APP_CONSTANTS.LOCAL_STORAGE_KEYS.CART,
      JSON.stringify(newItems)
    );
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      const existingIndex = items.findIndex((i) => i.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...items];
        updated[existingIndex].quantity += quantity;
        saveCart(updated);
      } else {
        saveCart([...items, { id: `cart-${Date.now()}`, product, quantity }]);
      }
    },
    [items, saveCart]
  );

  const removeItem = useCallback(
    (cartItemId: string) => {
      saveCart(items.filter((i) => i.id !== cartItemId));
    },
    [items, saveCart]
  );

  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(cartItemId);
        return;
      }
      saveCart(items.map((i) => (i.id === cartItemId ? { ...i, quantity } : i)));
    },
    [items, removeItem, saveCart]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return {
    items,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
