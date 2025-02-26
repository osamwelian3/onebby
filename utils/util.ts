import { Category } from "@/store/category/category";
import { Product } from "@/store/product/product";

export interface GroupedProducts {
  category: Category
  products: Product[]
}

// export const groupProductsByCategory = (
//     products: Product[],
//     categories: Category[]
//   ) => {
    
//     return categories.map((category) => {
//       return ({
//         category,
//         products: products.filter((product) => product.id_category_default === category.id),
//       } as GroupedProducts)
//     }).filter((item) => !item.category.name.includes('Home') && !item.category.name.includes('Root') && item.products.length > 0);
//   };

export const groupProductsByCategory = (
  products: Product[],
  categories: Category[]
): GroupedProducts[] => {
  // Step 1: Create a Map for categories to store their products
  const categoryMap = new Map<Number, GroupedProducts>();

  categories.forEach((category) => {
    // Exclude unwanted categories early
    if (!category.name.includes("Home") && !category.name.includes("Root")) {
      categoryMap.set(category.id, { category, products: [] });
    }
  });

  // Step 2: Iterate through products ONCE and group them in categoryMap
  products.forEach((product) => {
    const group = categoryMap.get(product.id_category_default);
    if (group) {
      group.products.push(product);
    }
  });

  // Step 3: Return only categories that have products
  return Array.from(categoryMap.values()).filter((group) => group.products.length > 0);
};


  