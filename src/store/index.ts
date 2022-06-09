import { createStore } from "vuex";
import axios from "axios";
import { allNamesData } from "@/components/NamesData/NamesData";

export type Joke = {
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
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
      getters: {
        // filterByFlag(state, flag) {
        //   if (state.allJokes.flags.nsfw === flag) {
        //     return state.allJokes.filter(
        //       (eachJoke: Joke) => eachJoke.flags.nsfw
        //     );
        //   } else if (state.allJokes.flags.religious === flag) {
        //     return state.allJokes.filter(
        //       (eachJoke: Joke) => eachJoke.flags.religious
        //     );
        //   } else if (state.allJokes.flags.political === flag) {
        //     return state.allJokes.filter(
        //       (eachJoke: Joke) => eachJoke.flags.political
        //     );
        //   } else if (state.allJokes.flags.racist === flag) {
        //     return state.allJokes.filter(
        //       (eachJoke: Joke) => eachJoke.flags.racist
        //     );
        //   } else if (state.allJokes.flags.sexist === flag) {
        //     return state.allJokes.filter(
        //       (eachJoke: Joke) => eachJoke.flags.sexist
        //     );
        //   } else if (state.allJokes.flags.explicit === flag) {
        //     return state.allJokes.filter(
        //       (eachJoke: Joke) => eachJoke.flags.explicit
        //     );
        //   } else {
        //     return state.allJokes;
        //   }
        // },
      },
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
        unpickedNamesMutation(state) {
          const newNames = [...state.allNames];
          const randomRange = state.allNames.length;
          const randomIndex = Math.floor(Math.random() * randomRange);
          state.selectedName = newNames[randomIndex].name;
          newNames.splice(randomIndex, 1);
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
