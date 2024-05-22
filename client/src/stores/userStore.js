import { writable } from "svelte/store";

export const user = writable(null);

export function login(email) {
  user.set({ email });
}

export function logout() {
  user.set(null);
}
