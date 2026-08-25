import { useState } from "react";
import { roomOptions, type Room } from "@/data/rooms";

const ROOMS_PER_PAGE = 5;
const MAX_PRICE = 2000;

function getInitialFilters() {
  const params = new URLSearchParams(window.location.search);
  const adultsParam = Number(params.get("adults"));
  const childrenParam = Number(params.get("children"));
  const capacityParam = Number(params.get("capacity"));
  const meal = params.get("meal");
  const mealPrice = params.get("mealPrice");
  const maxPrice = Number(params.get("maxPrice"));

  const initialAdults = Number.isFinite(adultsParam) && adultsParam > 0 ? adultsParam : 0;
  const initialChildren = Number.isFinite(childrenParam) && childrenParam > 0 ? childrenParam : 0;
  const totalGuests = initialAdults + initialChildren;

  let capacities: number[] = [];
  if (totalGuests > 0) {
    if (totalGuests <= 2) {
      capacities = [2, 4];
    } else {
      capacities = [4];
    }
  } else if (capacityParam === 2 || capacityParam === 4) {
    capacities = [capacityParam];
  }

  let meals: string[] = [];
  if (meal) {
    meals.push(meal);
  } else if (mealPrice) {
    if (mealPrice === "incluso") meals.push("Café da manhã");
    if (mealPrice === "80") meals.push("Meia pensão");
    if (mealPrice === "150") meals.push("Pensão completa");
  }

  return {
    adults: initialAdults,
    children: initialChildren,
    capacities,
    meals,
    mealPrice: mealPrice || "",
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
  const [adults, setAdults] = useState<number>(initialFilters.adults);
  const [children, setChildren] = useState<number>(initialFilters.children);
  const [mealPrice, setMealPrice] = useState<string>(initialFilters.mealPrice);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>(
    initialFilters.capacities,
  );
  const [selectedMeals, setSelectedMeals] = useState<string[]>(
    initialFilters.meals,
  );
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters.maxPrice);

  const updateAdults = (val: number) => {
    setAdults(val);
    setPage(0);
  };

  const updateChildren = (val: number) => {
    setChildren(val);
    setPage(0);
  };

  const updateMealPrice = (val: string) => {
    setMealPrice(val);
    if (val === "incluso") {
      setSelectedMeals(["Café da manhã"]);
    } else if (val === "80") {
      setSelectedMeals(["Meia pensão"]);
    } else if (val === "150") {
      setSelectedMeals(["Pensão completa"]);
    } else if (val === "") {
      setSelectedMeals([]);
    }
    setPage(0);
  };

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

  const totalGuests = adults + children;

  const filteredRooms = roomOptions.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesGuestCount = totalGuests === 0 || room.capacity >= totalGuests;

    const matchesCapacity =
      selectedCapacities.length === 0 ||
      selectedCapacities.includes(room.capacity);

    const matchesMeal =
      selectedMeals.length === 0 ||
      selectedMeals.some((meal) => room.meals.includes(meal));

    const matchesPrice = room.price <= maxPrice;

    return matchesSearch && matchesGuestCount && matchesCapacity && matchesMeal && matchesPrice;
  });

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const visibleRooms: Room[] = filteredRooms.slice(
    page * ROOMS_PER_PAGE,
    page * ROOMS_PER_PAGE + ROOMS_PER_PAGE,
  );

  const activeFilterCount =
    (adults > 0 ? 1 : 0) +
    (children > 0 ? 1 : 0) +
    selectedCapacities.length +
    selectedMeals.length +
    (mealPrice ? 1 : 0) +
    (maxPrice < MAX_PRICE ? 1 : 0);

  const clearFilters = () => {
    setSearchQuery("");
    setAdults(0);
    setChildren(0);
    setMealPrice("");
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
    adults,
    updateAdults,
    children,
    updateChildren,
    mealPrice,
    updateMealPrice,
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
