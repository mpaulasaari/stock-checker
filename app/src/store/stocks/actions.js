import * as R from 'ramda'

import {
  fetchStockDetails,
  fetchStockPrice,
  fetchStocksList,
} from 'utils/dataFetching'
import { parseStockData } from 'utils/dataParsing'

import {
  CLEAR_SELECTED_STOCK,
  GET_STOCK_DETAILS,
  GET_STOCK_DETAILS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  GET_STOCKS_LIST,
  GET_STOCKS_LIST_SUCCESS,
  GET_STOCKS_LIST_FAIL,
} from 'constants/actionTypes'

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

const requestStocksList = list => ({
  type: GET_STOCKS_LIST,
  list,
})

const requestStocksListSuccess = payload => ({
  type: GET_STOCKS_LIST_SUCCESS,
  payload,
})

const requestStocksListFail = payload => ({
  type: GET_STOCKS_LIST_FAIL,
  payload,
})

export const getStockDetails = symbol => (
  async (dispatch, getState) => {
    dispatch(requestStock(symbol))

    const { stocks: { list } } = getState()
    const cachedStock = R.find(R.propEq('symbol', symbol))(list)
    const cachedStockHasDetails = R.prop('description')(cachedStock)

    if (cachedStockHasDetails) {
      return dispatch(requestStockSuccess(symbol, cachedStock))
    }

    const stock = await fetchStockDetails(symbol)

    return dispatch(requestStockSuccess(symbol, stock))
  }
)

export const getStockDetailsAndPrice = symbol => (
  async (dispatch) => {
    dispatch(requestStock(symbol))

    const [
      stockDetails,
      stockPrice,
    ] = await Promise.all([
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

export const getStocksList = list => (
  async (dispatch) => {
    dispatch(requestStocksList(list))

    const stocksList = await fetchStocksList(list)

    if (!stocksList.length) {
      return dispatch(requestStocksListFail(list))
    }

    const parsedStocksList = stocksList.map(parseStockData)

    return dispatch(requestStocksListSuccess(parsedStocksList))
  }
)
