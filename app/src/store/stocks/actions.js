import {
  fetchStockInfo,
  fetchStockPrice,
  fetchStocksList,
} from '../../utils/dataFetching'

import {
  CLEAR_SELECTED_STOCK,
  GET_STOCK,
  GET_STOCK_SUCCESS,
  GET_STOCK_FAIL,
  GET_STOCK_LIST,
  GET_STOCK_LIST_SUCCESS,
} from '../../constants/actionTypes'

const requestStock = symbol => ({
  type: GET_STOCK,
  symbol,
})

const requestStockSuccess = (symbol, payload) => ({
  type: GET_STOCK_SUCCESS,
  symbol,
  payload,
})

const requestStockFail = symbol => ({
  type: GET_STOCK_FAIL,
  symbol,
})

const requestStockList = () => ({
  type: GET_STOCK_LIST,
})

const receiveStockList = payload => ({
  type: GET_STOCK_LIST_SUCCESS,
  payload,
})

export const clearSelectedStock = () => ({
  type: CLEAR_SELECTED_STOCK,
})

export const getStockInfo = symbol => (
  async (dispatch) => {
    dispatch(requestStock(symbol))

    const stock = await fetchStockInfo(symbol)

    return dispatch(requestStockSuccess(symbol, stock))
  }
)

export const getStockInfoAndPrice = symbol => (
  async (dispatch) => {
    dispatch(requestStock(symbol))

    const [stockInfo, stockPrice] = await Promise.all([
      fetchStockInfo(symbol),
      fetchStockPrice(symbol),
    ])

    if (!stockInfo || !stockPrice) {
      return dispatch(requestStockFail(symbol))
    }

    const stock = {
      ...stockInfo,
      latestPrice: stockPrice,
    }

    return dispatch(requestStockSuccess(symbol, stock))
  }
)

export const getStocksList = () => (
  async (dispatch) => {
    dispatch(requestStockList())

    const stockList = await fetchStocksList('infocus')

    return dispatch(receiveStockList(stockList))
  }
)
