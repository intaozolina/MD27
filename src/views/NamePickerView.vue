<template>
  <div :key="students.id" v-for="students in allNames">
    <button @click="unpickedNames(students.id)">
      {{ students.name }}
    </button>
  </div>
  <div>
    Selected:
    <h1>{{ selectedName }}</h1>
  </div>
  <button @click="showAll">Show All Students</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

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
