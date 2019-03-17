import { mergeList } from 'utils/dataParsing'

import {
  GET_STOCK_DETAILS,
  GET_STOCK_DETAILS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  CLEAR_SELECTED_STOCK,
  GET_STOCKS_LIST,
  GET_STOCKS_LIST_SUCCESS,
  GET_STOCKS_LIST_FAIL,
} from 'constants/actionTypes'

const initialState = {
  isFetching: false,
  list: [],
  selected: '',
}

const stocks = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCK_DETAILS:
      return {
        ...state,
        isFetching: true,
        selected: action.symbol,
      }

    case GET_STOCK_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: mergeList(
          state.list,
          action.symbol,
          action.details,
        ),
      }

    case GET_STOCK_DETAILS_FAIL:
      return {
        ...state,
        isFetching: false,
      }

    case CLEAR_SELECTED_STOCK:
      return {
        ...state,
        selected: '',
      }

    case GET_STOCKS_LIST:
      return {
        ...state,
        isFetching: true,
      }

    case GET_STOCKS_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.list,
      }

    case GET_STOCKS_LIST_FAIL:
      return {
        ...state,
        isFetching: false,
      }

    default:
      return state
  }
}

export default stocks
