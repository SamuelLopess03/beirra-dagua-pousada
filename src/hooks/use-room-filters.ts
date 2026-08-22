import { useState } from "react";
import { roomOptions, type Room } from "@/data/rooms";

const ROOMS_PER_PAGE = 5;
const MAX_PRICE = 2000;

export function useRoomFilters() {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);

  const toggleCapacity = (cap: number) => {
    setSelectedCapacities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap],
    );
    setPage(0);
  };

  const toggleMeal = (meal: string) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal],
    );
    setPage(0);
  };

  const updateSearch = (query: string) => {
    setSearchQuery(query);
    setPage(0);
  };

  const updateMaxPrice = (price: number) => {
    setMaxPrice(price);
    setPage(0);
  };

  const filteredRooms = roomOptions.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCapacity =
      selectedCapacities.length === 0 ||
      selectedCapacities.includes(room.capacity);
    const matchesMeal =
      selectedMeals.length === 0 ||
      selectedMeals.some((meal) => room.meals.includes(meal));
    const matchesPrice = room.price <= maxPrice;

    return matchesSearch && matchesCapacity && matchesMeal && matchesPrice;
  });

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const visibleRooms: Room[] = filteredRooms.slice(
    page * ROOMS_PER_PAGE,
    page * ROOMS_PER_PAGE + ROOMS_PER_PAGE,
  );

  const activeFilterCount =
    selectedCapacities.length +
    selectedMeals.length +
    (maxPrice < MAX_PRICE ? 1 : 0);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCapacities([]);
    setSelectedMeals([]);
    setMaxPrice(MAX_PRICE);
    setPage(0);
  };

  return {
    page,
    setPage,
    roomsPerPage: ROOMS_PER_PAGE,
    searchQuery,
    updateSearch,
    selectedCapacities,
    toggleCapacity,
    selectedMeals,
    toggleMeal,
    maxPrice,
    updateMaxPrice,
    filteredRooms,
    visibleRooms,
    totalPages,
    activeFilterCount,
    clearFilters,
  };
}
