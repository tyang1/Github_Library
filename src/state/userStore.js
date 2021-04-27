//using mobx to get the app-wide user info and caching

//load the user info from cookie
//store the user tags
import { makeObservable, observable, computed, action } from "mobx";
import api from "../actions/API.js";

export class UserStore {
  constructor(api) {
    this.userId = null;
    this.articles = [];
    this.tags = [];
    this.api = api;
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleAllArticles = this.handleAllArticles.bind(this);
    this.addArticle = this.addArticle.bind(this);
    makeObservable(this, {
      userId: observable,
      articles: observable,
      tags: observable,
      getUserId: computed,
      getAllArticles: computed,
      addArticle: action,
      signUp: action,
      logIn: action,
    });
  }

  get getUserId() {
    return this.userId;
  }

  get getAllArticles() {
    return this.articles;
  }

  async signUp(data) {
    this.userId = await this.api.signUp(data);
    return true;
  }

  async logIn(data) {
    this.userId = await this.api.logIn(data);
    return true;
  }
  async handleAllArticles() {
    this.articles = await this.api.getAllArticles();
  }

  async addArticle(userId, article) {
    let newArticle = await this.api.addArticle(userId, article);
    let currArticles = [...this.articles];
    currArticles.push(newArticle);
    this.articles = currArticles;
  }
}

export default new UserStore(api);
