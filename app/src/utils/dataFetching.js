import fetch from 'cross-fetch'

import { IEX_TRADING_BASE_URL } from 'constants/api'

const handleFetchErrors = (response) => {
  if (!response.ok) throw Error(response.status)

  return response
}

export const fetchStockDetails = symbol => (
  fetch(`${IEX_TRADING_BASE_URL}/stock/${symbol}/company`)
    .then(handleFetchErrors)
    .then(response => response.json())
    .catch(error => console.error(error))
)

export const fetchStockPrice = symbol => (
  fetch(`${IEX_TRADING_BASE_URL}/stock/${symbol}/price`)
    .then(handleFetchErrors)
    .then(response => response.json())
    .catch(error => console.error(error))
)

export const fetchStocksList = list => (
  fetch(`${IEX_TRADING_BASE_URL}/stock/market/list/${list}`)
    .then(handleFetchErrors)
    .then(response => response.json())
    .catch(error => console.error(error))
)
