const GET_PUBS = 'pipsy/pubs/GET_PUBS';
const GET_PUBS_SUCCESS = 'pipsy/pubs/GET_PUBS_SUCCESS';
const GET_PUBS_FAIL = 'pipsy/pubs/GET_PUBS_FAIL';

const initialState = {
  availablePubs: [],
  selectedPub: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PUBS_SUCCESS:
      return {
        ...state,
        availablePubs: action.result
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
