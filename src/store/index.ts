import { createStore } from "vuex";
import axios from "axios";
import { allNamesData } from "@/components/NamesData/NamesData";

type Joke = {
  joke: string;
  flags: { [key: string]: boolean };
  id: number;
};

type SingleJoke = {
  joke: string;
  flags: { [key: string]: boolean };
  id: number;
  category: string;
};

export default createStore({
  modules: {
    jokesModule: {
      namespaced: true,
      state: {
        allJokes: [] as Joke[],
        singleJoke: {} as SingleJoke,
      },
      getters: {},
      mutations: {
        setJokes(state, jokesData) {
          state.allJokes = jokesData;
        },
        setJokeById(state, singleJokeData) {
          state.singleJoke = singleJokeData;
        },
      },
      actions: {
        loadJokes(context) {
          axios
            .get(
              "https://v2.jokeapi.dev/joke/Programming?type=single&amount=10,"
            )
            .then((resp) => {
              context.commit("setJokes", resp.data.jokes);
            });
        },
        loadJokeById(context, id) {
          axios
            .get(`https://v2.jokeapi.dev/joke/Any?idRange=${id}`)
            .then((resp) => {
              context.commit("setJokeById", resp.data);
            });
        },
      },
      modules: {},
    },
    namePicker: {
      namespaced: true,
      state: {
        allNames: allNamesData,
        selectedName: "",
      },
      getters: {},
      mutations: {
        unpickedNamesMutation(state, payload) {
          const newNames = [...state.allNames];
          const deleteIndex = newNames.findIndex((name) => name.id === payload);
          state.selectedName = newNames[deleteIndex].name;
          newNames.splice(deleteIndex, 1);
          state.allNames = newNames;
        },
        showAllMutation(state) {
          state.allNames = allNamesData;
          state.selectedName = "";
        },
      },
      actions: {
        unpickedNames(context, payload) {
          context.commit("unpickedNamesMutation", payload);
        },
        showAll(context) {
          context.commit("showAllMutation");
        },
      },
      modules: {},
    },
  },
});
