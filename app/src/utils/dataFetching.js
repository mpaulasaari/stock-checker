import fetch from 'cross-fetch'

import { IEX_TRADING_BASE_URL } from 'constants/api'

/**
 * Simple error handler for throwing fetching errors
 * @method handleFetchErrors
 * @param  {Object}          [response={}] raw response returned from server
 * @return {Object} returns the response if status is ok
 */
export const handleFetchErrors = (response = {}) => {
  if (!response.ok) throw Error(response.status)

  return response
}

/**
 * Fetch details for a stock by symbol
 * @method fetchStockDetails
 * @param  {String}          [symbol=''] stock symbol
 * @return {Promise} async fetch promise
 */
export const fetchStockDetails = (symbol = '') => (
  fetch(`${IEX_TRADING_BASE_URL}/stock/${symbol}/company`)
    .then(handleFetchErrors)
    .then(response => response.json())
    .catch(error => console.error(error))
)

/**
 * Fetch price for a stock by symbol
 * @method fetchStockDetails
 * @param  {String}          [symbol=''] stock symbol
 * @return {Promise} async fetch promise
 */
export const fetchStockPrice = (symbol = '') => (
  fetch(`${IEX_TRADING_BASE_URL}/stock/${symbol}/price`)
    .then(handleFetchErrors)
    .then(response => response.json())
    .catch(error => console.error(error))
)

/**
 * Fetch a list of stocks by list name
 * @method fetchStocksList
 * @param  {String}        [list=''] stock list name
 * @return {Promise} async fetch promise
 */
export const fetchStocksList = (list = '') => (
  fetch(`${IEX_TRADING_BASE_URL}/stock/market/list/${list}`)
    .then(handleFetchErrors)
    .then(response => response.json())
    .catch(error => console.error(error))
)
