import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// reducer는 (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;

// aciton creator  --> 다음엔 --> async action creator 가 나온다.
// const changeNickname = (data) => {
//   return {
//     type: 'CHANGE_NICKNAME',
//     data,
//   };
// };
// changeNickname('KDONG');
// {
//   type: 'CHANGE_NICKNAME',
//   data: 'KDONG'
// }
// store.dispatch(changeNickname('KDONG'));
