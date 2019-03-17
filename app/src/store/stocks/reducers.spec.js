import {
  GET_STOCK_DETAILS,
  GET_STOCK_DETAILS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  CLEAR_SELECTED_STOCK,
  GET_STOCKS_LIST,
  GET_STOCKS_LIST_SUCCESS,
  GET_STOCKS_LIST_FAIL,
} from 'constants/actionTypes'

import stocksReducer from './reducers'


describe('stocks reducers', () => {
  it('GET_STOCK_DETAILS should return proper results', () => {
    const symbol = 'foo'
    const action = {
      symbol,
      type: GET_STOCK_DETAILS,
    }
    const expectation = {
      isFetching: true,
      selected: symbol,
    }

    const stockDetails = stocksReducer([], action)
    expect(stockDetails).toEqual(expectation)
  })
})
