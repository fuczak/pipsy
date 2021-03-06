const GET_PUBS = 'pipsy/pubs/GET_PUBS';
const GET_PUBS_SUCCESS = 'pipsy/pubs/GET_PUBS_SUCCESS';
const GET_PUBS_FAIL = 'pipsy/pubs/GET_PUBS_FAIL';
const POST_PUB = 'pipsy/pubs/POST_PUB';
const POST_PUB_SUCCESS = 'pipsy/pubs/POST_PUB_SUCCESS';
const POST_PUB_FAIL = 'pipsy/pubs/POST_PUB_FAIL';
const GET_PLACES = 'pipsy/pubs/GET_PLACES';
const GET_PLACES_SUCCESS = 'pipsy/pubs/GET_PLACES_SUCCESS';
const GET_PLACES_FAIL = 'pipsy/pubs/GET_PLACES_FAIL';
const GET_PLACE_DETAILS = 'pipsy/pubs/GET_PLACE_DETAILS';
const GET_PLACE_DETAILS_SUCCESS = 'pipsy/pubs/GET_PLACE_DETAILS_SUCCESS';
const GET_PLACE_DETAILS_FAIL = 'pipsy/pubs/GET_PLACE_DETAILS_FAIL';
const CLEAR_PLACES_SUGGESTIONS = 'pipsy/pubs/CLEAR_PLACES_SUGGESTIONS';
const DELETE_PUB = 'pipsy/pubs/DELETE_PUB';
const DELETE_PUB_SUCCESS = 'pipsy/pubs/DELETE_PUB_SUCCESS';
const DELETE_PUB_FAIL = 'pipsy/pubs/DELETE_PUB_FAIL';
const SET_SELECTED_PUB_DESCRIPTION = 'pipsy/pubs/SET_SELECTED_PUB';

function getPubIndex(state, id) {
  let foundIndex = -1;
  state.availablePubs.forEach((el, index) => {
    if (el._id === id) foundIndex = index;
  });
  return foundIndex;
}

const initialState = {
  availablePubs: [],
  isFetching: false,
  selectedPub: {},
  foundPlaces: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PUBS:
      return {
        ...state,
        isFetching: true
      };
    case GET_PUBS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        availablePubs: action.result
      };
    case GET_PUBS_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case GET_PLACES:
      return {
        ...state,
        isFetching: true
      };
    case GET_PLACES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        foundPlaces: action.result.predictions
      };
    case GET_PLACES_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case GET_PLACE_DETAILS:
      return {
        ...state,
        isFetching: true
      };
    case GET_PLACE_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedPub: {
          ...state.selectedPub,
          details: action.result.result
        }
      };
    case GET_PLACE_DETAILS_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case CLEAR_PLACES_SUGGESTIONS:
      return {
        ...state,
        foundPlaces: []
      };
    case DELETE_PUB_SUCCESS:
      const index = getPubIndex(state, action.payload.id);
      return {
        ...state,
        availablePubs: [
          ...state.availablePubs.slice(0, index),
          ...state.availablePubs.slice(index + 1)
        ]
      };
    case SET_SELECTED_PUB_DESCRIPTION:
      return {
        ...state,
        selectedPub: {
          ...state.selectedPub,
          description: action.payload.description
        }
      };
    default:
      return state;
  }

}

export function arePubsLoaded(globalState) {
  return globalState.pubs.availablePubs.length !== 0;
}

export function getPubs() {
  return {
    types: [GET_PUBS, GET_PUBS_SUCCESS, GET_PUBS_FAIL],
    promise: (client) => client.get('/pubs')
  };
}

export function postPub(pub) {
  return {
    types: [POST_PUB, POST_PUB_SUCCESS, POST_PUB_FAIL],
    promise: (client) => client.post('/pubs', {
      data: pub
    })
  };
}

export function deletePub(id) {
  return {
    types: [DELETE_PUB, DELETE_PUB_SUCCESS, DELETE_PUB_FAIL],
    payload: {
      id
    },
    promise: (client) => client.del(`/pubs/${id}`)
  };
}

export function queryPlaces(query) {
  return {
    types: [GET_PLACES, GET_PLACES_SUCCESS, GET_PLACES_FAIL],
    payload: {
      query
    },
    promise: (client) => client.get(`/pubs/places?q=${query}`)
  };
}

export function queryPlaceDetails(placeId) {
  return {
    types: [GET_PLACE_DETAILS, GET_PLACE_DETAILS_SUCCESS, GET_PLACE_DETAILS_FAIL],
    payload: {
      placeId
    },
    promise: (client) => client.get(`/pubs/places?id=${placeId}`)
  };
}

export function clearPlaces() {
  return {
    type: CLEAR_PLACES_SUGGESTIONS
  };
}

export function setSelectedPubDescription(description) {
  return {
    type: SET_SELECTED_PUB_DESCRIPTION,
    payload: {
      description
    }
  };
}

export function clickedOnPlaceSuggestion(placeId, description) {
  return (dispatch) => {
    dispatch(setSelectedPubDescription(description));
    dispatch(queryPlaceDetails(placeId));
  };
}
