import config from "../config/config";
import {Client, Account, ID} from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // account.create does NOT log the new user in, so the admin stays logged in
  async createAccount({email, password, name}) {
    return await this.account.create(ID.unique(), email, password, name);
  }

  async login({email, password}) {
    // remove an old session first, otherwise Appwrite says "session is active"
    try {
      await this.account.deleteSessions();
    } catch (error) {
      // no old session, this is fine
    }
    return await this.account.createEmailPasswordSession(email, password);
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // 401 for a guest is normal, it just means "not logged in"
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
