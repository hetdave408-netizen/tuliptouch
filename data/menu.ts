export type MenuCategory =
  | 'Hot Brewing'
  | 'Cold Coffee'
  | 'Shakes'
  | 'Mocktails'
  | 'Desserts';

export type MenuItem = {
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  vegetarian: boolean;
  image: string;
  featured?: boolean;
  tags?: string[];
};

const imageByCategory: Record<MenuCategory, string> = {
  'Hot Brewing': '/images/coffee-study.svg',
  'Cold Coffee': '/images/coffee-study.svg',
  Shakes: '/images/dessert-study.svg',
  Mocktails: '/images/interior-study.svg',
  Desserts: '/images/dessert-study.svg',
};

export const menuItems: MenuItem[] = [
  { name: 'Cafe Latte', price: 220, description: 'An Italian drink made with espresso and steamed milk.', category: 'Hot Brewing', vegetarian: true, image: imageByCategory['Hot Brewing'], tags: ['espresso'] },
  { name: 'Cappuccino', price: 200, description: 'Single shot of espresso with steamed milk.', category: 'Hot Brewing', vegetarian: true, image: imageByCategory['Hot Brewing'], tags: ['espresso'] },
  { name: 'Flat White', price: 220, description: 'A drink with espresso with steamed milk with small, fine bubbly creamy texture.', category: 'Hot Brewing', vegetarian: true, image: imageByCategory['Hot Brewing'], tags: ['espresso'] },
  { name: 'The Rose Coffee', price: 270, description: "Experience 'The Rose Coffee,' our cafe's latest creation, blending premium coffee beans with dried rose petals for a uniquely fragrant and balanced flavours.", category: 'Hot Brewing', vegetarian: true, image: imageByCategory['Hot Brewing'], featured: true, tags: ['signature'] },
  { name: 'Vietnamese Hot', price: 260, description: 'Double shot coffee stirred with condensed milk and hot water.', category: 'Hot Brewing', vegetarian: true, image: imageByCategory['Hot Brewing'], tags: ['espresso'] },
  { name: 'Black Orange', price: 270, description: 'A unique concoction of fresh orange juice with espresso shot.', category: 'Cold Coffee', vegetarian: true, image: imageByCategory['Cold Coffee'], tags: ['citrus'] },
  { name: 'Brownie Coffee', price: 299, description: 'A perfect blend of chocolate ice cream, espresso shot and delicious brownie.', category: 'Cold Coffee', vegetarian: true, image: imageByCategory['Cold Coffee'], featured: true, tags: ['chocolate'] },
  { name: 'Classic Cold', price: 270, description: 'A classic blend of vanilla ice cream, milk and espresso shot.', category: 'Cold Coffee', vegetarian: true, image: imageByCategory['Cold Coffee'], tags: ['classic'] },
  { name: 'Hazelnut Mocha', price: 299, description: 'Concoction of vanilla ice cream, chocolate ice cream, espresso shot and complimenting flavourer of hazelnut.', category: 'Cold Coffee', vegetarian: true, image: imageByCategory['Cold Coffee'], tags: ['chocolate'] },
  { name: 'Iced Latte', price: 250, description: 'Bland of double shot espresso milk and ice-cubes.', category: 'Cold Coffee', vegetarian: true, image: imageByCategory['Cold Coffee'], tags: ['espresso'] },
  { name: 'Thai Cold Coffee', price: 299, description: 'A blend of vanilla ice cream, espresso shot and flavour of Thai.', category: 'Cold Coffee', vegetarian: true, image: imageByCategory['Cold Coffee'], featured: true, tags: ['signature'] },
  { name: 'Vietnamese Cold', price: 260, description: 'An espresso shot stirred with condense milk and ice cubes.', category: 'Cold Coffee', vegetarian: true, image: imageByCategory['Cold Coffee'], tags: ['espresso'] },
  { name: 'Double Chocolate Chips', price: 300, description: 'Rich and creamy chocolate shake.', category: 'Shakes', vegetarian: true, image: imageByCategory.Shakes, tags: ['chocolate'] },
  { name: 'Loaded Biscoff', price: 350, description: 'A must try lip smacking shake made by blending all-time favourite lotus Bischoff biscuits with vanilla ice cream.', category: 'Shakes', vegetarian: true, image: imageByCategory.Shakes, featured: true, tags: ['signature'] },
  { name: 'Classic Mojito', price: 250, description: 'A refreshing blend of fresh mint, lime, and sparkling soda.', category: 'Mocktails', vegetarian: true, image: imageByCategory.Mocktails, tags: ['fresh'] },
  { name: 'Lemon Basil Spritzer', price: 250, description: 'A tangy taste of lemon with fresh aromatic flavour of basil with a subtle peppery flavour and a hint of mint.', category: 'Mocktails', vegetarian: true, image: imageByCategory.Mocktails, tags: ['fresh'] },
  { name: 'Watermelon Hibiscus', price: 250, description: 'A fruity-sweet taste of watermelon with earthy unique flavour of hibiscus makes wonderful drink altogether.', category: 'Mocktails', vegetarian: true, image: imageByCategory.Mocktails, tags: ['fresh'] },
  { name: 'Blueberry Cheese Cake', price: 280, description: 'Savor the sublime harmony of juicy blueberries and creamy cheesecake, a delightful symphony in every bite.', category: 'Desserts', vegetarian: true, image: imageByCategory.Desserts, featured: true, tags: ['sweet'] },
  { name: 'Chocolate Truffle', price: 300, description: 'Savor the divine richness of chocolate truffles, where every bite is a moment of pure indulgence.', category: 'Desserts', vegetarian: true, image: imageByCategory.Desserts, featured: true, tags: ['chocolate'] },
  { name: 'Tulip Touch Zeste', price: 350, description: 'Let the zesty embrace of lemon dance with the sweetness of cake, crafting a slice of sunshine in every bite.', category: 'Desserts', vegetarian: true, image: imageByCategory.Desserts, tags: ['sweet'] },
];

export const menuCategories: Array<'All' | MenuCategory> = ['All', 'Hot Brewing', 'Cold Coffee', 'Shakes', 'Mocktails', 'Desserts'];
export const featuredMenu = menuItems.filter((item) => item.featured);
