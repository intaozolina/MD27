<template>
  <div class="jokes_hero">
    <div class="filter__btn-box">
      <div :key="index" v-for="(singleFlag, index) in flagsData">
        <button class="filter__btn-btn" @click="flagFilter(singleFlag)">
          {{ singleFlag }}
        </button>
      </div>
    </div>
    <div class="joke__section">
      <div class="joke__box" :key="joke.id" v-for="joke in allJokes">
        <h1 class="joke__heading">Joke Nr. {{ joke.id }}</h1>
        <p class="joke__paragraph">{{ joke.joke }}</p>
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

export default defineComponent({
  name: "JokesView",
  data: () => ({
    flagsData: [
      "nsfw",
      "religious",
      "political",
      "racist",
      "sexist",
      "explicit",
    ],
  }),
  mounted() {
    this.loadJokes();
  },
  computed: {
    ...mapState("jokesModule", ["allJokes"]),
    // ...mapGetters("jokesModule", ["filterByFlag()"]),
  },
  methods: {
    ...mapActions("jokesModule", ["loadJokes", "loadJokeByFlag"]),
    ...mapMutations("jokesModule", [
      "setJokes",
      "setJokeById",
      "setJokesByFlag",
    ]),
    flagFilter(flag: string) {
      if (this.allJokes.flags.nsfw === flag) {
        return this.allJokes.filter((eachJoke: any) => eachJoke.flags.nsfw);
      } else if (this.allJokes.flags.religious === flag) {
        return this.allJokes.filter(
          (eachJoke: any) => eachJoke.flags.religious
        );
      } else if (this.allJokes.flags.political === flag) {
        return this.allJokes.filter(
          (eachJoke: any) => eachJoke.flags.political
        );
      } else if (this.allJokes.flags.racist === flag) {
        return this.allJokes.filter((eachJoke: any) => eachJoke.flags.racist);
      } else if (this.allJokes.flags.sexist === flag) {
        return this.allJokes.filter((eachJoke: any) => eachJoke.flags.sexist);
      } else if (this.allJokes.flags.explicit === flag) {
        return this.allJokes.filter((eachJoke: any) => eachJoke.flags.explicit);
      } else {
        return this.allJokes;
      }
    },
  },
});
</script>
