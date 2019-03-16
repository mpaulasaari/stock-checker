import * as R from 'ramda'

const STOCK_KEYS = [
  'description',
  'latestPrice',
  'symbol',
]

export const parseStockData = (stock) => {
  const props = {}

  Object.keys(stock).forEach((key) => {
    if (STOCK_KEYS.includes(key)) {
      props[key] = stock[key]
    }
  })

  return props
}

export const mergeList = (list, symbol, update) => {
  const itemIndex = R.findIndex(R.propEq('symbol', symbol))(list)

  if (itemIndex >= 0) {
    return R.adjust(
      itemIndex,
      stock => ({
        ...stock,
        ...parseStockData(update),
      }),
      list,
    )
  }

  return [...list, update]
}
