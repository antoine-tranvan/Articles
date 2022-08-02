import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const parseProps = (r) => ({ id: parseInt(r.params.id) });

const routes = [
  {
    path: "/",
    redirect: "/articles",
  },
  {
    path: "/articles",
    name: "articles",
    component: () =>
      import(/* webpackChunkName: "bundle.articles" */ "../views/Articles.vue"),
  },
  {
    path: "/articles/:id",
    name: "articleDetail",
    props: parseProps,
    component: () =>
      import(
        /* webpackChunkName: "bundle.articles" */ "../views/ArticleDetail.vue"
      ),
  },
  {
    path: "/surprise",
    name: "Surprise",
    component: () =>
      import(/* webpackChunkName: "bundle.articles" */ "../views/Surprise.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
