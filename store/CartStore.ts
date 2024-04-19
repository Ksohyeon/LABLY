export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  images: { url: string };
};

const CART_ITEMS = "cartItems";

export function getCartItems() {
  if (typeof window === "undefined") return null;
  return JSON.parse(sessionStorage.getItem(CART_ITEMS) || "{}");
}

export function updateCartItems(cartItems: Object) {
  sessionStorage.setItem(CART_ITEMS, JSON.stringify(cartItems));
}

export function addCartItem(cartItem: CartItem) {
  const cartItems = JSON.parse(sessionStorage.getItem(CART_ITEMS) || "{}");
  cartItems[cartItem.id] = cartItem;
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function deleteCartItem(cartItem: CartItem) {
  const cartItems = JSON.parse(sessionStorage.getItem(CART_ITEMS) || "{}");
  delete cartItems[cartItem.id];
  return cartItems;
}

export function clearCart() {
  sessionStorage.removeItem(CART_ITEMS);
}
