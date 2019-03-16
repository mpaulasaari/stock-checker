import * as R from 'ramda'

import {
  CLEAR_SELECTED_STOCK,
  GET_STOCK_DETAILS,
  GET_STOCK_DETAILS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  GET_STOCKS_LIST,
  GET_STOCKS_LIST_SUCCESS,
} from '../../constants/actionTypes'

const initialState = {
  isFetching: false,
  list: [],
  selected: '',
}
const getUpdatedList = (list, symbol, update) => {
  const itemIndex = R.findIndex(R.propEq('symbol', symbol))(list)

  if (itemIndex >= 0) {
    return R.adjust(
      itemIndex,
      stock => ({ ...stock, ...update }),
      list,
    )
  }

  return [...list, update]
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
        list: getUpdatedList(state.list, action.symbol, action.payload),
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
        list: action.payload,
      }

    default:
      return state
  }
}

export default stocks
