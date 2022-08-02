import * as axios from "axios";

const getArticles = async function () {
  try {
    const response = await axios.get("https://cms-beta.happytal.com/articles");
    let articles = parseList(response);

    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getArticleDetail = async function (id) {
  try {
    const response = await axios.get(
      `https://cms-beta.happytal.com/articles/${id}`
    );
    let articleDetail = parseList(response, 200);

    return articleDetail;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parseList = (response) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== "object") {
    list = [];
  }
  return list;
};

export const dataService = {
  getArticles,
  getArticleDetail,
};
