import config from "../config/config";
import {Client, Databases, ID, Query} from "appwrite";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  // ---------- small helpers, every collection below uses them ----------
  async list(collectionId, queries = []) {
    try {
      const res = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        collectionId,
        [Query.limit(100), ...queries],
      );
      return res.documents;
    } catch (error) {
      console.log("Appwrite Service :: list :: error", error);
      return [];
    }
  }

  create(collectionId, id, data) {
    return this.databases.createDocument(
      config.appwriteDatabaseId,
      collectionId,
      id,
      data,
    );
  }

  update(collectionId, id, data) {
    return this.databases.updateDocument(
      config.appwriteDatabaseId,
      collectionId,
      id,
      data,
    );
  }

  remove(collectionId, id) {
    return this.databases.deleteDocument(
      config.appwriteDatabaseId,
      collectionId,
      id,
    );
  }

  // ---------- products ----------
  getProducts() {
    return this.list(config.appwriteProductsId);
  }

  createProduct(data) {
    return this.create(config.appwriteProductsId, ID.unique(), data);
  }

  updateProduct(id, data) {
    return this.update(config.appwriteProductsId, id, data);
  }

  deleteProduct(id) {
    return this.remove(config.appwriteProductsId, id);
  }

  // ---------- categories ----------
  getCategories() {
    return this.list(config.appwriteCategoriesId);
  }

  createCategory(data) {
    return this.create(config.appwriteCategoriesId, ID.unique(), data);
  }

  deleteCategory(id) {
    return this.remove(config.appwriteCategoriesId, id);
  }

  // ---------- suppliers ----------
  getSuppliers() {
    return this.list(config.appwriteSuppliersId);
  }

  createSupplier(data) {
    return this.create(config.appwriteSuppliersId, ID.unique(), data);
  }

  deleteSupplier(id) {
    return this.remove(config.appwriteSuppliersId, id);
  }

  // ---------- orders ----------
  getOrders() {
    return this.list(config.appwriteOrdersId, [Query.orderDesc("$createdAt")]);
  }

  async getOrdersByUser(userid) {
    const orders = await this.getOrders();
    return orders.filter((order) => order.userid === userid);
  }

  // one click on "Order" = save the order + reduce the product stock by 1
  async placeOrder({product, userid, username}) {
    if (product.stock <= 0) {
      throw new Error("This product is out of stock");
    }

    const order = await this.create(config.appwriteOrdersId, ID.unique(), {
      productid: product.$id,
      productname: product.name,
      quantity: 1,
      total: product.price,
      userid,
      username,
    });

    await this.updateProduct(product.$id, {stock: product.stock - 1});
    return order;
  }

  // ---------- users (profile rows: name, email, address, role) ----------
  // the row id is the same as the Appwrite account id, so getDocument is easy
  getProfiles() {
    return this.list(config.appwriteUsersId);
  }

  async getProfile(userid) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersId,
        userid,
      );
    } catch (error) {
      console.log("Appwrite Service :: getProfile :: error", error);
      return null;
    }
  }

  createProfile(userid, data) {
    return this.create(config.appwriteUsersId, userid, data);
  }

  deleteProfile(userid) {
    return this.remove(config.appwriteUsersId, userid);
  }
}

const service = new Service();

export default service;
