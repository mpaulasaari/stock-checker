import * as R from 'ramda'

const STOCK_KEYS = [
  'description',
  'latestPrice',
  'symbol',
]

export const parseStockData = (stock = {}) => {
  const props = {}

  Object.keys(stock).forEach((key) => {
    if (STOCK_KEYS.includes(key)) {
      props[key] = stock[key]
    }
  })

  return props
}

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
