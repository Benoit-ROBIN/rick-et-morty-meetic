import { action } from 'typesafe-actions'
import { CharacterActionTypes, CharacterState, Character } from './types'

export const fetchAllCharacters = (page?: string|undefined) => action(CharacterActionTypes.FETCH_ALL_CHARACTERS, page)
export const fetchAllCharactersSuccess = (data: CharacterState) => action(CharacterActionTypes.FETCH_ALL_CHARACTERS_SUCCESS, data)

export const fetchOneCharacter = (id: number) => action(CharacterActionTypes.FETCH_ONE_CHARACTER, id)
export const fetchOneCharacterSuccess = (data: Character) => action(CharacterActionTypes.FETCH_ONE_CHARACTER_SUCCESS, data)

export const fetchError = (message: string) => action(CharacterActionTypes.FETCH_ERROR, message)