import {
  fetchStockDetails,
  fetchStockPrice,
  fetchStocksList,
} from '../../utils/dataFetching'

import {
  CLEAR_SELECTED_STOCK,
  GET_STOCK_DETAILS,
  GET_STOCK_DETAILS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  GET_STOCKS_LIST,
  GET_STOCKS_LIST_SUCCESS,
} from '../../constants/actionTypes'

const requestStock = symbol => ({
  type: GET_STOCK_DETAILS,
  symbol,
})

const requestStockSuccess = (symbol, payload) => ({
  type: GET_STOCK_DETAILS_SUCCESS,
  symbol,
  payload,
})

const requestStockFail = symbol => ({
  type: GET_STOCK_DETAILS_FAIL,
  symbol,
})

export const clearSelectedStock = () => ({
  type: CLEAR_SELECTED_STOCK,
})

const requestStocksList = () => ({
  type: GET_STOCKS_LIST,
})

const receiveStocksList = payload => ({
  type: GET_STOCKS_LIST_SUCCESS,
  payload,
})

export const getStockDetails = symbol => (
  async (dispatch) => {
    dispatch(requestStock(symbol))

    const stock = await fetchStockDetails(symbol)

    return dispatch(requestStockSuccess(symbol, stock))
  }
)

export const getStockDetailsAndPrice = symbol => (
  async (dispatch) => {
    dispatch(requestStock(symbol))

    const [stockDetails, stockPrice] = await Promise.all([
      fetchStockDetails(symbol),
      fetchStockPrice(symbol),
    ])

    if (!stockDetails || !stockPrice) {
      return dispatch(requestStockFail(symbol))
    }

    const stock = {
      ...stockDetails,
      latestPrice: stockPrice,
    }

    return dispatch(requestStockSuccess(symbol, stock))
  }
)

export const getStocksList = () => (
  async (dispatch) => {
    dispatch(requestStocksList())

    const stockList = await fetchStocksList('infocus')

    return dispatch(receiveStocksList(stockList))
  }
)
