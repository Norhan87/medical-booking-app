import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDoctorStore = create(
  persist(
    (set) => ({
      favorites: [],

      toggleFavorite: (doctor) =>
        set((state) => {
          const isFavorite = state.favorites.some(
            (favorite) => favorite.id === doctor.id,
          );

          if (isFavorite) {
            return {
              favorites: state.favorites.filter(
                (favorite) => favorite.id !== doctor.id,
              ),
            };
          }

          return {
            favorites: [...state.favorites, doctor],
          };
        }),
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "doctor-store",
    },
  ),
);

export default useDoctorStore;
