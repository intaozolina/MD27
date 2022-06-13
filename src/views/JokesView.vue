<template>
  <div class="jokes_hero">
    <div class="filter__btn-box">
      <div :key="index" v-for="(singleFlag, index) in flagsData">
        <button class="filter__btn-btn" @click="flagFilter(singleFlag)">
          {{ singleFlag }}
        </button>
      </div>
    </div>

    <div class="filter__btn-box">
      <div :key="index" v-for="(singleCategory, index) in categoryData">
        <button class="filter__btn-btn" @click="loadJokes(singleCategory)">
          {{ singleCategory }}
        </button>
      </div>
    </div>

    <div class="joke__section">
      <div class="joke__box" :key="joke.id" v-for="joke in allJokes">
        <h1 class="joke__heading">Joke Nr. {{ joke.id }}</h1>
        <h1 class="joke__heading">Joke Category is {{ joke.category }}</h1>
        <p class="joke__paragraph">{{ joke.joke }}</p>
        <div>{{ joke.flags }}</div>
        <router-link :to="`/jokes/${joke.id}`">
          <button class="joke__btn">See more</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import "../components/Reset/styleReset.css";
import "./jokeView.scss";

type Flag =
  | "nsfw"
  | "religious"
  | "political"
  | "racist"
  | "sexist"
  | "explicit";

export default defineComponent({
  name: "JokesView",
  data: () => ({}),
  mounted() {
    this.loadJokes("Any");
  },
  computed: {
    ...mapState("jokesModule", ["allJokes"]),
    flagsData() {
      return ["nsfw", "religious", "political", "racist", "sexist", "explicit"];
    },
    categoryData() {
      return ["Any", "Misc", "Programming", "Dark", "Pun"];
    },
    // ...mapGetters("jokesModule", ["filterByFlag()"]),
  },
  methods: {
    ...mapActions("jokesModule", ["loadJokes"]),
    ...mapMutations("jokesModule", ["setJokes"]),
    flagFilter(flag: Flag) {
      this.allJokes.filter((joke: any) => {
        Object.entries(joke.flags).map((eachFlag) => {
          if (eachFlag[0] === flag && eachFlag[1] === true) {
            return joke;
          }
        });
      });
    },
  },
});
</script>
