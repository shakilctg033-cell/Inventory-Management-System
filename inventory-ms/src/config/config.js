const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteProductsId: String(import.meta.env.VITE_APPWRITE_PRODUCTS_ID),
  appwriteCategoriesId: String(import.meta.env.VITE_APPWRITE_CATEGORIES_ID),
  appwriteSuppliersId: String(import.meta.env.VITE_APPWRITE_SUPPLIERS_ID),
  appwriteOrdersId: String(import.meta.env.VITE_APPWRITE_ORDERS_ID),
  appwriteUsersId: String(import.meta.env.VITE_APPWRITE_USERS_ID),
};

export default config;
