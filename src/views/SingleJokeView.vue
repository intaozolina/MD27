<template>
  <div class="home">
    <form @submit.prevent="loadJokeById(inputValue)">
      <input type="number" v-model="inputValue" />
      <button type="submit">Search</button>
    </form>
    <div>
      <h1>{{ joke.id }}</h1>
      <div>{{ joke.joke }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default defineComponent({
  name: "HomeView",
  data: () => ({
    inputValue: "",
  }),
  mounted() {
    this.loadJokeById();
  },
  computed: {
    ...mapState("jokesModule", ["singleJoke"]),
  },
  methods: {
    ...mapActions("jokesModule", ["loadJokeById"]),
    ...mapMutations("jokesModule", ["setJokeById"]),
  },
});
</script>
