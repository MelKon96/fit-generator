//фильтрация п категориям
type Category = "meat" | "vegetables" | "dairy" | "grains" | "fruits" | "fish" | "nuts";

export interface Product {
  id: string;
  name: string;
  price: number;
  calories: number; 
  proteins: number; 
  fats: number; 
  carbs: number; 
  image: string;
  category?: Category;
  isAvailable?: boolean;
  isVeggie: boolean;
  isDiabetesFriendly: boolean;

  tags?: string[]; // ['без сахара']
}

//? Типы для поиска товаров
export type SortField = "calories" | "proteins" | "fats" | "carbs" | "price";
export type SortOrder = "asc" | "desc";
