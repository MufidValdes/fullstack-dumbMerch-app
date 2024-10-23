export interface ICategories {
  id: number;
  category_name: string;
  stock?: number;
}

export interface CategoryDTO extends ICategories {}
