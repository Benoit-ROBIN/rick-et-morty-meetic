import { Reducer } from "redux";
import { CharacterState, CharacterActionTypes } from "./types";

// Type-safe initialState!
const initialState: CharacterState = {
  info: {
    count: 0,
    pages: 0
  },
  results: [],
  errors: undefined,
  loading: false
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<CharacterState> = (state = initialState, action) => {
  switch (action.type) {
    case CharacterActionTypes.FETCH_ONE_CHARACTER: {
      return { ...state, loading: true };
    }
    case CharacterActionTypes.FETCH_ONE_CHARACTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: state.results.map(character => {
          if (character.id === action.payload.id) {
             return action.payload;
          }
          return character;
        }),
      };
    }
    case CharacterActionTypes.FETCH_ALL_CHARACTERS: {
      return { ...state, loading: true };
    }
    case CharacterActionTypes.FETCH_ALL_CHARACTERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: state.results.concat(action.payload.results),
        info: action.payload.info
      };
    }
    case CharacterActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as CharacterReducer };
