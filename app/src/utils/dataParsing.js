import * as R from 'ramda'

const STOCK_KEYS = [
  'description',
  'latestPrice',
  'priceUpdated',
  'symbol',
]

export const parseStockData = (stock = {}) => (
  R.pick(STOCK_KEYS, stock)
)

export const addPriceUpdated = (stock = {}) => (
  R.assoc('priceUpdated', new Date().valueOf(), stock)
)

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

export const formatSelectItems = (name) => {
  if (!name) return null

  return ({
    label: name,
    value: name,
  })
}

export const formatListForSelect = (list = []) => (
  list.map(({ symbol }) => formatSelectItems(symbol))
)
