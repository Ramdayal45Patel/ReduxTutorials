const redux = require("redux");
const createStore = redux.createStore;
const appliedMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").thunk;
const axios = require("axios");
//Initial State
const initialState = {
  loading: false,
  user: [],
  error: "",
};

//Actions
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
const fetchUserSuccess = () => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = () => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, actions) => {
  switch (actions?.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: actions?.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        users: [],
        error: actions?.payload,
      };

    default:
      state
  }
};
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response?.data);
        const users = response?.data?.map((user) => user?.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        console.log(" error?.message;", error);
        dispatch(fetchUserFailure(error?.message));
      });
  };
};

const store = createStore(reducer, appliedMiddleware(thunkMiddleware));

store.subscribe(() => console.log("Initial State", store?.getState()));

store.dispatch(fetchUsers());
