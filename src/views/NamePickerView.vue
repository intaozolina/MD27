<template>
  <div class="selector__hero">
    <div class="selector__section">
      <h3 class="selector__section-heading">Selected:</h3>
      <h1 class="selector__section-result">{{ selectedName }}</h1>
      <button class="selector__btn" @click="unpickedNames">
        Get random Name
      </button>
    </div>

    <h3 class="selector__heading">Available Names</h3>

    <div class="selector__names">
      <div
        class="selector__name"
        :key="students.id"
        v-for="students in allNames"
      >
        {{ students.name }}
      </div>
    </div>

    <button class="reset_btn" @click="showAll">Show All Students</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import "../components/Reset/styleReset.css";
import "./namePicker.scss";

export default defineComponent({
  name: "NamePickerView",
  computed: {
    ...mapState("namePicker", ["allNames", "selectedName"]),
  },
  methods: {
    ...mapActions("namePicker", ["unpickedNames", "showAll"]),
    ...mapMutations("namePicker", ["unpickedNamesMutation", "showAllMutation"]),
  },
});
</script>
