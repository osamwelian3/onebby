import { Category } from "@/store/category/category";
import { Product } from "@/store/product/product";

export interface GroupedProducts {
  category: Category
  products: Product[]
}

export const groupProductsByCategory = (
    products: Product[],
    categories: Category[]
  ) => {
    
    return categories.map((category) => {
      return ({
        category,
        products: products.filter((product) => product.id_category_default === category.id),
      } as GroupedProducts)
    }).filter((item) => !item.category.name.includes('Home') && !item.category.name.includes('Root') && item.products.length > 0);
  };

  