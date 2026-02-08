// Описываем категории для фильтрации
type Category = "meat" | "vegetables" | "dairy" | "grains" | "fruits" | "fish" | "nuts";

export interface Product {
  id: string;
  name: string;
  price: number;
  calories: number; // на 100г
  proteins: number; // на 100г
  fats: number; // на 100г
  carbs: number; // на 100г
  image: string;
  category?: Category;
  isAvailable?: boolean;
  isVeggie: boolean;
  isDiabetesFriendly: boolean;
  // Поля для будущих фич
  tags?: string[]; // например, ['без сахара', 'высокий белок']
}

//? Типы для поиска товаров
export type SortField = "calories" | "proteins" | "fats" | "carbs" | "price";
export type SortOrder = "asc" | "desc";
