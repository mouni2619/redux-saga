import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
} from './userSlice';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function* fetchUsers() {
  try {
    const response = yield call(axios.get, `${API_URL}`);
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* updateUser(action) {
  try {
    const { id, ...data } = action.payload;
    yield call(axios.put, `${API_URL}/${id}`, data);
    yield put(updateUserSuccess(action.payload));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

function* deleteUser(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    console.error(error.message);
  }
}

export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(updateUserRequest.type, updateUser);
  yield takeLatest(deleteUserRequest.type, deleteUser);
}
