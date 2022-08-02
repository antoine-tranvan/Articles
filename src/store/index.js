import Vue from "vue";
import Vuex from "vuex";
import { dataService } from "../shared";
import {
  GET_ARTICLES,
  GET_ARTICLE_DETAIL,
  UPDATE_REVEAL,
} from "./mutation-types";

Vue.use(Vuex);

const state = () => ({ articles: [], articleDetail: {}, reveal: [] });

const mutations = {
  [GET_ARTICLES](state, articles) {
    state.articles = articles;
  },
  [GET_ARTICLE_DETAIL](state, articleDetail) {
    state.articleDetail = articleDetail;

    const reveal = [];
    if (articleDetail.partners.length > 0) {
      for (let i = 0; i < state.articleDetail.partners.length; i++) {
        reveal.push({
          id: state.articleDetail.partners[i].id,
          reveal: false,
        });
      }
      // console.log("reveal - creation", reveal);
    }
    state.reveal = reveal;
  },
  [UPDATE_REVEAL](state, id) {
    for (let i = 0; i < state.reveal.length; i++) {
      if (state.reveal[i].id === id) {
        state.reveal[i].reveal = !state.reveal[i].reveal;
      }
    }
  },
};

const actions = {
  async getArticlesAction({ commit }) {
    const articles = await dataService.getArticles();
    commit(GET_ARTICLES, articles);
  },
  async getArticleById({ commit }, id) {
    const articleDetail = await dataService.getArticleDetail(id);
    commit(GET_ARTICLE_DETAIL, articleDetail);
  },
  async updateReveal({ commit }, id) {
    commit(UPDATE_REVEAL, id);
  },
};

const getters = () => ({});

const modules = () => ({});

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
