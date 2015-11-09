const QUERY = 'pipsy/boardgames/QUERY';
const QUERY_SUCCESS = 'pipsy/boardgames/QUERY_SUCCESS';
const QUERY_FAIL = 'pipsy/boardgames/QUERY_FAIL';
const ADD_TO_STAGING = 'pipsy/boardgames/ADD_TO_STAGING';
const REMOVE_FROM_STAGING = 'pipsy/boardgames/REMOVE_FROM_STAGING';

const initialState = {
  isFetching: false,
  foundBoardgames: [],
  currentInput: '',
  responseReceived: false,
  stagedBoardgames: [],
  selectedPub: '',
  availablePubs: [],
  isUpdating: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY:
      return {
        ...state,
        isFetching: true,
        currentInput: action.payload.query,
        foundBoardgames: [],
        responseReceived: false
      };
    case QUERY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        foundBoardgames: action.result,
        responseReceived: true
      };
    case QUERY_FAIL:
      return {
        ...state,
        isFetching: false,
        foundBoardgames: [],
        responseReceived: true
      };
    case ADD_TO_STAGING:
      if (state.stagedBoardgames.indexOf(state.foundBoardgames[action.payload.index]) !== -1) {
        return state;
      }
      return {
        ...state,
        stagedBoardgames: [
          ...state.stagedBoardgames,
          state.foundBoardgames[action.payload.index]
        ]
      };
    case REMOVE_FROM_STAGING:
      return {
        ...state,
        stagedBoardgames: [
          ...state.stagedBoardgames.slice(0, action.payload.index),
          ...state.stagedBoardgames.slice(action.payload.index + 1)
        ]
      };
    default:
      return state;
  }
}

export function loadFromDB(query) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAIL],
    payload: {
      query
    },
    promise: (client) => client.get('/boardgames/loadFromDB?q=' + query)
  };
}

export function loadFromBGG(query) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAIL],
    payload: {
      query
    },
    promise: (client) => client.get('/boardgames/loadFromBGG?q=' + query)
  };
}

export function addToStaging(index) {
  return {
    type: ADD_TO_STAGING,
    payload: {
      index
    }
  };
}

export function removeFromStaging(index) {
  return {
    type: REMOVE_FROM_STAGING,
    payload: {
      index
    }
  };
}
