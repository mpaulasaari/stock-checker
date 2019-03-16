import * as R from 'ramda'

import {
  CLEAR_SELECTED_STOCK,
  GET_STOCK,
  GET_STOCK_SUCCESS,
  GET_STOCK_LIST,
  GET_STOCK_LIST_SUCCESS,
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
    case GET_STOCK_LIST:
      return {
        ...state,
        isFetching: true,
      }

    case GET_STOCK_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload,
      }

    case GET_STOCK:
      return {
        ...state,
        isFetching: true,
        selected: '',
      }

    case GET_STOCK_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: getUpdatedList(state.list, action.symbol, action.payload),
        selected: action.symbol,
      }

    case CLEAR_SELECTED_STOCK:
      return {
        ...state,
        selected: '',
      }

    default:
      return state
  }
}

export default stocks
