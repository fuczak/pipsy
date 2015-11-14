const GET_PUBS = 'pipsy/pubs/GET_PUBS';
const GET_PUBS_SUCCESS = 'pipsy/pubs/GET_PUBS_SUCCESS';
const GET_PUBS_FAIL = 'pipsy/pubs/GET_PUBS_FAIL';
const SET_SELECTED_PUB = 'pipsy/pubs/SET_SELECTED_PUB';

const initialState = {
  availablePubs: [],
  selectedPub: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PUBS_SUCCESS:
      return {
        ...state,
        availablePubs: action.result,
        selectedPub: action.result[0]
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

export function setSelectedPub(index) {
  return {
    type: SET_SELECTED_PUB,
    payload: {
      index
    }
  };
}
