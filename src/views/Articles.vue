<template>
  <v-container fluid>
    <v-row class="SortAndSearchBanner">
      <v-col class="SortAndSearchFields d-flex" cols="12" sm="3">
        <v-text-field
          label="Recherche"
          type="text"
          v-model="search"
          placeholder="Que recherchez-vous ?"
          dense
        ></v-text-field>
      </v-col>

      <v-col class="SortAndSearchFields d-flex" cols="12" sm="3">
        <v-select :items="items" v-model="sort" label="Tri" dense></v-select>
      </v-col>
    </v-row>
    <v-row class="Cards">
      <v-col
        v-for="article in filteredList"
        :key="article.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-lazy
          :options="{
            threshold: 0.5,
          }"
          min-height="200"
          transition="fade-transition"
        >
          <router-link
            tag="button"
            :to="{ name: 'articleDetail', params: { id: article.id } }"
          >
            <v-card class="articleCard">
              <v-img :src="article.image.url" height="200px"> </v-img>
              <div class="cardDate">
                <span>
                  Publié le
                  {{ article.published_at | shortDate }}</span
                >
              </div>
              <div class="cardTitle">
                <span>{{ article.title }}</span>
              </div>
            </v-card>
          </router-link>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "Articles",
  data: () => ({
    show: false,
    search: "",
    items: ["Du plus récent au plus ancien", "Du plus ancien au plus récent"],
    sort: "",
  }),
  async created() {
    await this.loadArticles();
  },
  methods: {
    ...mapActions(["getArticlesAction"]),
    async loadArticles() {
      await this.getArticlesAction();
    },
  },
  computed: {
    ...mapState(["articles"]),
    filteredList() {
      let tempList = this.articles;
      // console.log("templist", tempList);

      tempList = tempList.filter((element) => {
        return element.title.toLowerCase().indexOf(this.search.toLowerCase()) >=
          0
          ? true
          : element.slug.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
          ? true
          : false;
      });

      tempList = tempList.sort((a, b) => {
        if (this.sort == "Du plus récent au plus ancien") {
          return new Date(b.published_at) - new Date(a.published_at);
        } else if (this.sort == "Du plus ancien au plus récent") {
          return new Date(a.published_at) - new Date(b.published_at);
        }
      });

      return tempList;
    },
  },
  filters: {
    shortDate: function (value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cardTitle {
  font-size: 15px;
  word-break: break-word;
  padding: 5px;
  font-weight: bold;
}
.cardDate {
  font-size: 12px;
  word-break: break-word;
  font-style: italic;
  margin-top: 10px;
}
.SortAndSearchBanner {
  background-color: #f5f6fa;
  margin-top: 2px;
  margin-bottom: 5px;
  align-items: flex-end;
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
}
.SortAndSearchFields {
  padding: 5px;
  padding-top: 10px;
  margin-top: 10px;
}
.Cards {
  margin: 5px;
}
.articleCard {
  width: 330px;
  height: 290px;
}
</style>
