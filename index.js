const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";

// Actions
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Cake buy",
  };
}

// Reducers
// set initial state

const initialState = {
  numOfCakes: 10,
};

const reducer = (state = initialState, actions) => {
  switch (actions?.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state?.numOfCakes - 1,
      };
    default:
      return state;
  }
};

// make Store
const store = createStore(reducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Update state", store.getState())
);
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
