import { combineReducers } from "redux";
import feedsReducer from "./feedsReducer";
import cartReducer from "./cartReducer";

const myReducer = combineReducers({
  feeds: feedsReducer,
  cartItems: cartReducer,
});

export default myReducer;
