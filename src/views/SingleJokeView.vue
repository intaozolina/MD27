<template>
  <div class="singleJoke__hero">
    <div class="singleJoke__box">
      <h1 class="singleJoke__heading">Joke's ID: {{ singleJoke.id }}</h1>
      <h3 class="singleJoke__sub-heading">
        Joke's category is {{ singleJoke.category }}
      </h3>
      <h5 class="singleJoke__sub-heading">Joke</h5>
      <p class="singleJoke__paragraph">{{ singleJoke.joke }}</p>
      <div
        class="singleJoke__flag-box"
        :key="index"
        v-for="(flag, index) in singleJokeFlags"
      >
        <p class="singleJoke__paragraph">{{ flag[0] }} : {{ flag[1] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import "./singleJokeView.scss";

export default defineComponent({
  name: "SingleJokeView",

  mounted() {
    this.loadJokeById(this.$route.params.id);
  },

  computed: {
    ...mapState("jokesModule", ["singleJoke", "singleJokeFlags"]),
  },

  methods: {
    ...mapActions("jokesModule", ["loadJokeById"]),
    ...mapMutations("jokesModule", ["setJokeById"]),
  },
});
</script>
