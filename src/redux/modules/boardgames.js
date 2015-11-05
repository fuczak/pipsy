const QUERY = 'pipsy/boardgames/QUERY';
const QUERY_SUCCESS = 'pipsy/boardgames/QUERY_SUCCESS';
const QUERY_FAIL = 'pipsy/boardgames/QUERY_FAIL';

const initialState = {
  loaded: false,
  currentInput: '',
  foundTitles: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY:
      return {
        ...state,
        loaded: true,
        currentInput: action.payload,
        foundTitles: [
          ...state.foundTitles,
          action.payload
        ]
      };
    case QUERY_SUCCESS:
      return {
        ...state,
        currentInput: action.result
      };
    case QUERY_FAIL:
    default:
      return state;
  }
}

export function load(query) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAIL],
    promise: (client) => client.get('/boardgames/load?q=' + query )
    // type: QUERY,
    // payload: query
  };
}
