import { createStore } from "redux";
import myReducer from "./reducers";

const store = createStore(myReducer);

export default store;
