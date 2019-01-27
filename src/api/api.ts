export class Api {

  async getCharacter(URL: string) {
    return fetch(URL)
      .then(response => response.json())
      .then(json => {
        return json;
      });
  }

}
