import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';

// all로 등록
export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

// 제너레이터 --> function*
// 제너레이터 실행 법 --> 함수명().next() 로 실행된다.
// yield --> 일드 --> 중단점 --> 일드가 있는부분에서 멈춘다.
// 제너레이터는 안에 일드를 넣어주면 그 부분에서 멈춘다.

// saga에서는 절대 멈추지 않는 제너레이터가 있다.
// let i = 0;
// const gen = function* () {
//   while (true) {
//     yield i++;
//   }
// };

// call 과 fork의 차이
// fork 는 비동기 호출 --> 요청보내고 결과 기다리는거 상관없이 바로 다음거 실행된다.
// call 은 동기 호출 --> 리턴할때까지 기다렸다가 호출된다.

// saga effect
// all, fork, call, take, put, delay, debounce, throttle, takeLatest, takeMaybe 등이 있다.
