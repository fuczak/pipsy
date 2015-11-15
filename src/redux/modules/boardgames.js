const QUERY = 'pipsy/boardgames/QUERY';
const QUERY_SUCCESS = 'pipsy/boardgames/QUERY_SUCCESS';
const QUERY_FAIL = 'pipsy/boardgames/QUERY_FAIL';
const SELECT_ENDPOINT = 'pipsy/boardgames/SELECT_ENDPOINT';
const GET_ONE = 'pipsy/boardgames/GET_ONE';
const GET_ONE_SUCCESS = 'pipsy/boardgames/GET_ONE_SUCCESS';
const GET_ONE_FAIL = 'pipsu/boardgames/GET_ONE_FAIL';
const ADD_TO_STAGING = 'pipsy/boardgames/ADD_TO_STAGING';
const REMOVE_FROM_STAGING = 'pipsy/boardgames/REMOVE_FROM_STAGING';
const POST_BOARDGAME = 'pipsy/pubs/POST_BOARDGAME';
const POST_BOARDGAME_SUCCESS = 'pipsy/pubs/POST_BOARDGAME_SUCCESS';
const POST_BOARDGAME_FAIL = 'pipsy/pubs/POST_BOARDGAME_FAIL';

import isInArray from '../../helpers/isInArray';

const initialState = {
  isFetching: false,
  responseReceived: false,
  foundBoardgames: [],
  stagedBoardgames: [],
  isUpdating: false,
  selectedEndpoint: 'DB',
  availableEndpoints: ['DB', 'BGG']
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
    case POST_BOARDGAME:
    case POST_BOARDGAME_SUCCESS:
    case POST_BOARDGAME_FAIL:
      console.log(action);
      return state;
    default:
      return state;
  }
}

export function load(query, endpoint) {
  const url = (endpoint === 'DB') ? `/boardgames?name__regex=/${query}/i` : `/boardgames/bgg?q=${query}`;
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAIL],
    payload: {
      query
    },
    promise: (client) => client.get(url)
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
    promise: (client) => client.get(`/boardgames/bggone?q=${id}`)
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

export function postBoardgame(boardgame) {
  return {
    types: [POST_BOARDGAME, POST_BOARDGAME_SUCCESS, POST_BOARDGAME_FAIL],
    payload: {
      boardgame
    },
    promise: (client) => client.post('/boardgames', {
      data: boardgame
    })
  };
}

export function submitStagedGames() {
  return (dispatch, getState) => {
    getState().boardgames.stagedBoardgames.filter((el) => {
      return !el._id;
    }).forEach((el) => {
      dispatch(postBoardgame(el));
    });
  };
}
