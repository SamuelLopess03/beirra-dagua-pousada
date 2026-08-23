import { useState } from "react";
import { roomOptions, type Room } from "@/data/rooms";

const ROOMS_PER_PAGE = 5;
const MAX_PRICE = 2000;

function getInitialFilters() {
  const params = new URLSearchParams(window.location.search);
  const capacity = Number(params.get("capacity"));
  const meal = params.get("meal");
  const maxPrice = Number(params.get("maxPrice"));

  return {
    capacities: capacity === 2 || capacity === 4 ? [capacity] : [],
    meals: meal ? [meal] : [],
    maxPrice:
      Number.isFinite(maxPrice) && maxPrice >= 300 && maxPrice <= MAX_PRICE
        ? maxPrice
        : MAX_PRICE,
  };
}

export function useRoomFilters() {
  const initialFilters = getInitialFilters();
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>(
    initialFilters.capacities,
  );
  const [selectedMeals, setSelectedMeals] = useState<string[]>(
    initialFilters.meals,
  );
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters.maxPrice);

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
