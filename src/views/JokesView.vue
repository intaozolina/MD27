<template>
  <div class="home">
    <div :key="joke.id" v-for="joke in allJokes">
      <h1>{{ joke.id }}</h1>
      <div>{{ joke.joke }}</div>
      <button @click="setJokeById(joke.id)">See more</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "HomeView",
  data: () => ({}),
  mounted() {
    this.loadJokes();
  },
  computed: {
    ...mapState("jokesModule", ["allJokes"]),
  },
  methods: {
    ...mapActions("jokesModule", ["loadJokes"]),
    ...mapMutations("jokesModule", ["setJokes", "setJokeById"]),
  },
});
</script>
