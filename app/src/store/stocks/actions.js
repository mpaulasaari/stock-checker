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
  GET_STOCK_DETAILS,
  GET_STOCK_DETAILS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  CLEAR_SELECTED_STOCK,
  GET_STOCKS_LIST,
  GET_STOCKS_LIST_SUCCESS,
  GET_STOCKS_LIST_FAIL,
} from 'constants/actionTypes'

export const requestStock = symbol => ({
  type: GET_STOCK_DETAILS,
  symbol,
})

export const requestStockSuccess = (symbol, payload) => ({
  type: GET_STOCK_DETAILS_SUCCESS,
  symbol,
  payload,
})

export const requestStockFail = symbol => ({
  type: GET_STOCK_DETAILS_FAIL,
  symbol,
})

export const clearSelectedStock = () => ({
  type: CLEAR_SELECTED_STOCK,
})

export const requestStocksList = list => ({
  type: GET_STOCKS_LIST,
  list,
})

export const requestStocksListSuccess = payload => ({
  type: GET_STOCKS_LIST_SUCCESS,
  payload,
})

export const requestStocksListFail = payload => ({
  type: GET_STOCKS_LIST_FAIL,
  payload,
})

/**
 * [shouldFetchStockPrice description]
 * @method shouldFetchStockPrice
 * @param  {Object}              cachedStock
 * @param  {String}              now
 * @return {Boolean}
 */
const shouldFetchStockPrice = (cachedStock, now) => {
  const CACHE_TIME = 5 * 60 * 1000
  const cacheExpired = R.prop('priceUpdated', cachedStock) < (now - CACHE_TIME)

  return (!cachedStock || cacheExpired)
}

/**
 * Thunk Action Creator for getting stock details
 * @method getStockDetails
 * @param  {String}        symbol
 * @return {Dispatch}
 */
export const getStockDetails = symbol => (
  async (dispatch, getState) => {
    dispatch(requestStock(symbol))

    const { stocks: { list } } = getState()
    const promises = [] // Array of fetches to be done
    const now = new Date().valueOf()
    const cachedStock = R.find(R.propEq('symbol', symbol))(list)
    const cachedStockHasDetails = R.prop('description')(cachedStock)

    // Check if the stock already exists in store and return cached details or
    // fetch details accordingly
    if (cachedStockHasDetails) {
      promises.push(() => Promise.resolve(cachedStock))
    } else {
      promises.push(() => fetchStockDetails(symbol))
    }

    // Check if should fetch new price for the stock
    if (shouldFetchStockPrice(cachedStock, now)) {
      promises.push(() => fetchStockPrice(symbol))
    }

    // Fetch stock details and/or price as determined above
    const [
      stock,
      stockPrice,
    ] = await Promise.all(
      promises.map(promise => promise()),
    )
    // No stock found = symbol does not exist
    if (!stock) {
      return dispatch(requestStockFail(symbol))
    }

    // If stock price was fetched, add the data to stock object
    if (stockPrice) {
      stock.latestPrice = stockPrice
      stock.priceUpdated = now
    }

    return dispatch(requestStockSuccess(symbol, stock))
  }
)

/**
 * Thunk Action Creator for getting stock list
 * @method getStocksList
 * @param  {String}      list
 * @return {Dispatch}
 */
export const getStocksList = list => (
  async (dispatch) => {
    dispatch(requestStocksList(list))

    const stocksList = await fetchStocksList(list)

    // No stock list found = wrong list name or something failed server side
    if (!stocksList || !stocksList.length) {
      return dispatch(requestStocksListFail(list))
    }

    // Parse the stock objects to contain only specific information and add
    // update time for price
    const parsedStocksList = stocksList
      .map(parseStockData)
      .map(addPriceUpdated)

    return dispatch(requestStocksListSuccess(parsedStocksList))
  }
)
