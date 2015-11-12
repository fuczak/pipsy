const QUERY = 'pipsy/boardgames/QUERY';
const QUERY_SUCCESS = 'pipsy/boardgames/QUERY_SUCCESS';
const QUERY_FAIL = 'pipsy/boardgames/QUERY_FAIL';
const SELECT_ENDPOINT = 'pipsy/boardgames/SELECT_ENDPOINT';
const GET_ONE = 'pipsy/boardgames/GET_ONE';
const GET_ONE_SUCCESS = 'pipsy/boardgames/GET_ONE_SUCCESS';
const GET_ONE_FAIL = 'pipsu/boardgames/GET_ONE_FAIL';
const ADD_TO_STAGING = 'pipsy/boardgames/ADD_TO_STAGING';
const REMOVE_FROM_STAGING = 'pipsy/boardgames/REMOVE_FROM_STAGING';

import isInArray from '../../helpers/isInArray';

const initialState = {
  isFetching: false,
  foundBoardgames: [],
  responseReceived: false,
  stagedBoardgames: [],
  selectedPub: '',
  availablePubs: [],
  selectedEndpoint: 'DB',
  availableEnpoints: ['DB', 'BGG'],
  isUpdating: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY:
      return {
        ...state,
        isFetching: true,
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
    case SELECT_ENDPOINT:
      return {
        ...state,
        selectedEndpoint: action.payload.endpoint
      };
    case GET_ONE:
      return {
        ...state,
        isUpdating: true,
      };
    case GET_ONE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        stagedBoardgames: [
          ...state.stagedBoardgames.slice(0, state.stagedBoardgames.length - 1),
          Object.assign({}, state.stagedBoardgames[state.stagedBoardgames.length - 1], action.result)
        ]
      };
    case GET_ONE_FAIL:
      return {
        ...state,
        isUpdating: false
      };
    case ADD_TO_STAGING:
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

export function load(query, endpoint) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAIL],
    payload: {
      query
    },
    promise: (client) => client.get(`/boardgames/loadFrom${endpoint}?q=` + query)
  };
}

export function selectEndpoint(endpoint) {
  return {
    type: SELECT_ENDPOINT,
    payload: {
      endpoint
    }
  };
}

export function getOneFromBGG(id) {
  return {
    types: [GET_ONE, GET_ONE_SUCCESS, GET_ONE_FAIL],
    promise: (client) => client.get('/boardgames/getOneFromBGG?q=' + id)
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

export function moveClickedToStaging(index, game) {
  return (dispatch, getState) => {
    const state = getState().boardgames;
    if (!isInArray(state.stagedBoardgames, game.bggid) && !state.isUpdating) {
      dispatch(addToStaging(index));
      if (game.score === undefined) dispatch(getOneFromBGG(game.bggid));
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
