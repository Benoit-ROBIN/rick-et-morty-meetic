import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { CharacterActionTypes } from './types'
import { fetchError, fetchAllCharactersSuccess, fetchOneCharacterSuccess } from './actions'
import { Api } from '../../api/api';

const BASE_URL:string = 'https://rickandmortyapi.com/api/'

/**
 * Fetch one character
 * @param url 
 */
function* handleFetchOneCharacter(id: any) {
  try {
    const END_POINT:string = BASE_URL+'character/'+id.payload
    const api = new Api
    const res = yield call(api.getCharacter, END_POINT)

    yield put(fetchOneCharacterSuccess(res))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}
function* watchFetchOneCharacterRequest() {
  yield takeEvery(CharacterActionTypes.FETCH_ONE_CHARACTER, handleFetchOneCharacter)
}

/**
 * Fetch all characters
 * @param url 
 */
function* handleFetchAllCharacters(url: any) {
  try {
    const END_POINT:string = url.payload || BASE_URL+'character/'
    const api = new Api
    const res = yield call(api.getCharacter, END_POINT)

    yield put(fetchAllCharactersSuccess(res))
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}
function* watchFetchAllCharactersRequest() {
  yield takeEvery(CharacterActionTypes.FETCH_ALL_CHARACTERS, handleFetchAllCharacters)
}



// We can also use `fork()` here to split our saga into multiple watchers.
function* characterSaga() {
  yield all([fork(watchFetchAllCharactersRequest), fork(watchFetchOneCharacterRequest)])
}

export default characterSaga
