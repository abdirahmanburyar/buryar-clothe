import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist'
import userReducer from '../reducers/user/user.reducer'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
    user: userReducer
})
export default persistReducer(persistConfig, rootReducer);
