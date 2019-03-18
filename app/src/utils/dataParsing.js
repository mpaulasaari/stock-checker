import * as R from 'ramda'

/**
 * Keys for the information we want to store about a stock
 * @type {Array}
 */
const STOCK_KEYS = [
  'description',
  'latestPrice',
  'priceUpdated',
  'symbol',
]

/**
 * Parse a stock object to include only keys defined in STOCK_KEYS
 * @method parseStockData
 * @param  {Object}       [stock={}] raw stock object as returned from server
 * @return {Object} parsed stock object which includes only wanted keys
 */
export const parseStockData = (stock = {}) => (
  R.pick(STOCK_KEYS, stock)
)

/**
 * Add priceUpdated key with current timestamp value to a stock object
 * @method addPriceUpdated
 * @param  {Object}        [stock={}] stock object
 * @return {Object} stock object with new property: { priceUpdated: current timestamp }
 */
export const addPriceUpdated = (stock = {}) => (
  R.assoc('priceUpdated', new Date().valueOf(), stock)
)

/**
 * Update information for a stock in the stocks list or add a new stock object
 * to the list if it didn't already contain it
 * @method mergeList
 * @param  {Array}   [list=[]] current stock list
 * @param  {String}  [symbol=''] symbol for the stock to be updated/added
 * @param  {Object}  [update={}] updated for existing stock or a new stock object
 * @return {Array} updated stock list
 */
export const mergeList = (list = [], symbol = '', update = {}) => {
  const itemIndex = R.findIndex(R.propEq('symbol', symbol))(list)
  const stockUpdate = parseStockData(update)

  if (itemIndex >= 0) {
    return R.adjust(
      itemIndex,
      stock => R.merge(stock, stockUpdate),
      list,
    )
  }

  return [...list, stockUpdate]
}

/**
 * Create correctly formatted objects for ReactSelect component
 * @method formatSelectItems
 * @param  {String}          name select item name. can be undefined also
 * @return {Object} formatted item object for ReactSelect
 */
export const formatSelectItems = (name) => {
  if (!name) return null

  return ({
    label: name,
    value: name,
  })
}

/**
 * Create correctly formatted list for ReactSelect component
 * @method formatListForSelect
 * @param  {Array}             [list=[]] stock list
 * @return {Array} formatted stock list for ReactSelect
 */
export const formatListForSelect = (list = []) => (
  list.map(({ symbol }) => formatSelectItems(symbol))
)
