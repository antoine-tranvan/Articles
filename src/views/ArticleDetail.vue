<template>
  <div>
    <v-img
      class="banner"
      :lazy-src="articleDetail.image.url"
      :src="articleDetail.image.url"
    ></v-img>
    <p class="articleTitle" v-if="articleDetail">
      {{ articleDetail.title }}
    </p>
    <p
      class="articleDetail"
      v-html="articleDetail.content"
      v-if="articleDetail"
    ></p>
    <v-container>
      <p class="subTitle" v-if="articleDetail.partners.length > 0">
        Nos partenaires
      </p>
      <v-row justify-start>
        <v-col
          v-for="(partner, i) in articleDetail.partners"
          :key="i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card>
            <v-img height="250" :src="partner.logo.url"></v-img>

            <v-card-title>{{ partner.name }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0"> </v-row>

              <div class="my-2 text-subtitle-1">
                <v-icon>mdi-phone</v-icon> •
                <a :href="`tel: ${partner.phone}`">
                  {{ partner.phone ? partner.phone : "Non communiqué" }}</a
                >
              </div>
              <div class="my-2 text-subtitle-1">
                <v-icon>mdi-email</v-icon>

                •
                <a :href="`mailto: ${partner.email}`">{{
                  partner.email ? partner.email : "Non communiqué"
                }}</a>
              </div>
              <v-card-actions>
                <v-btn
                  text
                  color="teal accent-4"
                  @click="modifyReveal(partner.id)"
                >
                  Plus de détails
                </v-btn>
              </v-card-actions>
            </v-card-text>
            <v-expand-transition>
              <v-card
                v-if="reveal[i].reveal"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: 100%"
              >
                <v-card-text class="pb-0">
                  <p class="text-h6 text--primary">Description</p>
                  <p v-html="partner.description"></p>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn
                    text
                    color="teal accent-4"
                    @click="modifyReveal(partner.id)"
                  >
                    Fermer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ArticleDetail",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },

  async created() {
    await this.getArticleById(this.id);
  },

  methods: {
    ...mapActions(["getArticleById", "updateReveal"]),
    async modifyReveal(id) {
      await this.updateReveal(id);
    },
  },
  computed: {
    ...mapState(["articleDetail", "reveal"]),
  },
};
</script>

<style lang="scss" scoped>
.banner {
  margin-top: 10px;
  margin-bottom: 10px;
  max-height: 150px;
  width: 100%;
}
.articleTitle {
  margin: 10px;
  font-size: 25px;
}
.articleDetail {
  margin-left: 10px;
  margin-right: 10px;
  white-space: pre-wrap;
}
.subTitle {
  font-size: 20px;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
