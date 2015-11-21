const GET_PUBS = 'pipsy/pubs/GET_PUBS';
const GET_PUBS_SUCCESS = 'pipsy/pubs/GET_PUBS_SUCCESS';
const GET_PUBS_FAIL = 'pipsy/pubs/GET_PUBS_FAIL';
const POST_PUB = 'pipsy/pubs/POST_PUB';
const POST_PUB_SUCCESS = 'pipsy/pubs/POST_PUB_SUCCESS';
const POST_PUB_FAIL = 'pipsy/pubs/POST_PUB_FAIL';
const DELETE_PUB = 'pipsy/pubs/DELETE_PUB';
const DELETE_PUB_SUCCESS = 'pipsy/pubs/DELETE_PUB_SUCCESS';
const DELETE_PUB_FAIL = 'pipsy/pubs/DELETE_PUB_FAIL';
const SET_SELECTED_PUB = 'pipsy/pubs/SET_SELECTED_PUB';

function getPubIndex(state, id) {
  let foundIndex = -1;
  state.availablePubs.forEach((el, index) => {
    if (el._id === id) foundIndex = index;
  });
  return foundIndex;
}

const initialState = {
  availablePubs: [],
  selectedPub: {},
  pubBeingEdited: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PUBS:
      return {
        ...state
      };
    case GET_PUBS_SUCCESS:
      return {
        ...state,
        availablePubs: action.result,
        selectedPub: action.result[0]
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
    case SET_SELECTED_PUB:
      return {
        ...state,
        selectedPub: state.availablePubs[action.payload.index]
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

export function setSelectedPub(index) {
  return {
    type: SET_SELECTED_PUB,
    payload: {
      index
    }
  };
}

export function setSelectedPubById(id) {
  return (dispatch, getState) => {
    dispatch(setSelectedPub(getPubIndex(getState().pubs, id)));
  };
}
