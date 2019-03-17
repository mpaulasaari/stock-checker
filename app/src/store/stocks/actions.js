import * as R from 'ramda'

import {
  fetchStockDetails,
  fetchStockPrice,
  fetchStocksList,
} from 'utils/dataFetching'
import {
  addPriceUpdated,
  parseStockData,
} from 'utils/dataParsing'

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

const shouldFetchStockPrice = (cachedStock, now) => {
  const CACHE_TIME = 5 * 60 * 1000
  const cacheExpired = R.prop('priceUpdated', cachedStock) < (now - CACHE_TIME)

  return (!cachedStock || cacheExpired)
}

export const getStockDetails = symbol => (
  async (dispatch, getState) => {
    dispatch(requestStock(symbol))

    const { stocks: { list } } = getState()
    const promises = []
    const cachedStock = R.find(R.propEq('symbol', symbol))(list)
    const cachedStockHasDetails = R.prop('description')(cachedStock)
    const now = new Date().valueOf()

    if (cachedStockHasDetails) {
      promises.push(() => Promise.resolve(cachedStock))
    } else {
      promises.push(() => fetchStockDetails(symbol))
    }

    if (shouldFetchStockPrice(cachedStock, now)) {
      promises.push(() => fetchStockPrice(symbol))
    }

    const [
      stock,
      stockPrice,
    ] = await Promise.all(
      promises.map(promise => promise()),
    )

    if (!stock) {
      return dispatch(requestStockFail(symbol))
    }

    if (stockPrice) {
      stock.latestPrice = stockPrice
      stock.priceUpdated = now
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

    const parsedStocksList = stocksList
      .map(parseStockData)
      .map(addPriceUpdated)

    return dispatch(requestStocksListSuccess(parsedStocksList))
  }
)
