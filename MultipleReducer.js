const redux = require("redux");
const reduxLogger = require("redux-logger");
const createStore = redux.createStore;
const createCombineReducer = redux.combineReducers;
const applyMiddlewareRedux = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREME = "BUY_ICE_CREME";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    INFO: "Buy first cake",
  };
};
const buyICE = () => {
  return {
    type: "BUY_ICE_CREME",
    INFO: "Buy first ICE_CREME",
  };
};
const initialCake = {
  numberOfCake: 10,
};

const buyCakeReducer = (state = initialCake, action) => {
  switch (action?.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCake: state?.numberOfCake - 1,
      };
    default:
      return state;
  }
};

const initialIceCreme = {
  numberOfIceCreme: 20,
};

const buyIceCremeReducer = (currentState = initialIceCreme, action) => {
  switch (action?.type) {
    case BUY_ICE_CREME:
      return {
        ...currentState,
        numberOfIceCreme: currentState?.numberOfIceCreme - 1,
      };
    default:
      return currentState;
  }
};

const reducer = createCombineReducer({
  cake: buyCakeReducer,
  iceCreme: buyIceCremeReducer,
});
const store = createStore(reducer,applyMiddlewareRedux(logger));

console.log("INITIAL STATE", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Update State", store.getState());
});

store.dispatch(buyCake());
store.dispatch(buyICE());
store.dispatch(buyCake());
store.dispatch(buyICE());

store.dispatch(buyCake());
store.dispatch(buyICE());

store.dispatch(buyCake());
store.dispatch(buyICE());

unsubscribe();
