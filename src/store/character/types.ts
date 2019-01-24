export interface Character extends ApiResponse {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterPosition;
  location: CharacterPosition;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterPosition {
  name: string;
  url: string;
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>;

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
// Convention de redux quant au nommage des actions
export const enum CharacterActionTypes {
  FETCH_REQUEST = "@@heroes/FETCH_REQUEST",
  FETCH_SUCCESS = "@@heroes/FETCH_SUCCESS",
  FETCH_ERROR = "@@heroes/FETCH_ERROR"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// Readonly pour éviter les erreurs liées à l'immutabilité du state
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface CharacterState {
  readonly loading: boolean;
  readonly results: Character[];
  readonly info: RequestInfo;
  readonly errors?: string;
}

export interface RequestInfo {
    count: number,
    pages: number,
    next: string,
    prev: string
}
