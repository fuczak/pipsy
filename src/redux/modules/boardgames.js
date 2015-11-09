const QUERY = 'pipsy/boardgames/QUERY';
const QUERY_SUCCESS = 'pipsy/boardgames/QUERY_SUCCESS';
const QUERY_FAIL = 'pipsy/boardgames/QUERY_FAIL';

const initialState = {
  isFetching: false,
  foundBoardgames: [],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case QUERY:
      return {
        ...state,
        isFetching: true,
        foundBoardgames: []
      };
    case QUERY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        foundBoardgames: action.result
      };
    case QUERY_FAIL:
      return {
        ...state,
        isFetching: false,
        foundBoardgames: []
      };
    default:
      return state;
  }
}

export function load(query) {
  return {
    types: [QUERY, QUERY_SUCCESS, QUERY_FAIL],
    promise: (client) => client.get('/boardgames/load?q=' + query )
  };
}
