import { CharacterState } from '../store/character/types';

export class Api {
    API_ENDPOINT = 'https://gateway.marvel.com:443/v1/public/'

    getCharacters = () :Promise<CharacterState> => {
        return fetch('API_ENDPOINT').then((response)=>{
            return response.json()
        })
    }
}