/* eslint-disable import/first */
jest.mock('utils/dataFetching', () => ({
  fetchStockDetails: jest.fn((symbol) => {
    if (symbol) return Promise.resolve({ description: 'example' })
    return Promise.resolve()
  }),
  fetchStockPrice: jest.fn(() => Promise.resolve(100)),
  fetchStocksList: jest.fn((list) => {
    if (list) return Promise.resolve([{ symbol: 'exists' }])
    return Promise.resolve([])
  }),
}))

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  fetchStockDetails,
  fetchStockPrice,
  fetchStocksList,
} from 'utils/dataFetching'

import {
  getStockDetails,
  getStocksList,
  requestStock,
  requestStockSuccess,
  requestStockFail,
  requestStocksList,
  requestStocksListSuccess,
  requestStocksListFail,
} from './actions'

const initialState = {
  stocks: {
    list: [
      {
        symbol: 'cacheExpired',
        latestPrice: 123,
        description: 'cacheExpired',
        priceUpdated: 0,
      },
      {
        symbol: 'cacheValid',
        latestPrice: 234,
        description: 'cacheValid',
        priceUpdated: new Date().valueOf(),
      },
      {
        symbol: 'noDetails',
        latestPrice: 234,
        priceUpdated: new Date().valueOf(),
      },
    ],
  },
}
const middleware = [thunk]
const mockStore = configureStore(middleware)
const store = mockStore(initialState)

describe('stocks actions', () => {
  beforeEach(() => {
    store.clearActions()
    fetchStockDetails.mockClear()
    fetchStockPrice.mockClear()
  })

  test('getStockDetails dispatches actions to return cached instance for existing item with valid cache', async () => {
    const symbol = 'cacheValid'
    const payload = {
      description: symbol,
      latestPrice: 234,
      priceUpdated: expect.any(Number),
      symbol,
    }

    await store.dispatch(getStockDetails(symbol))
    expect(fetchStockDetails).not.toHaveBeenCalled()
    expect(fetchStockPrice).not.toHaveBeenCalled()
    expect(store.getActions()[0]).toEqual(requestStock(symbol))
    expect(store.getActions()[1]).toEqual(requestStockSuccess(symbol, payload))
  })

  test('getStockDetails dispatches actions to get updated price for existing item with expired cache', async () => {
    const symbol = 'cacheExpired'
    const payload = {
      description: symbol,
      latestPrice: 100,
      priceUpdated: expect.any(Number),
      symbol,
    }

    await store.dispatch(getStockDetails(symbol))
    expect(fetchStockDetails).not.toHaveBeenCalled()
    expect(fetchStockPrice).toHaveBeenCalledWith(symbol)
    expect(store.getActions()[0]).toEqual(requestStock(symbol))
    expect(store.getActions()[1]).toEqual(requestStockSuccess(symbol, payload))
  })

  test('getStockDetails dispatches actions to get details for existing item without description', async () => {
    const symbol = 'noDetails'
    const payload = {
      description: 'example',
    }

    await store.dispatch(getStockDetails(symbol))
    expect(fetchStockDetails).toHaveBeenCalledWith(symbol)
    expect(fetchStockPrice).not.toHaveBeenCalled()
    expect(store.getActions()[0]).toEqual(requestStock(symbol))
    expect(store.getActions()[1]).toEqual(requestStockSuccess(symbol, payload))
  })

  test('getStockDetails dispatches actions to get details and price for new symbol', async () => {
    const symbol = 'newSymbol'
    const payload = {
      description: 'example',
      latestPrice: 100,
      priceUpdated: expect.any(Number),
    }

    await store.dispatch(getStockDetails(symbol))
    expect(fetchStockDetails).toHaveBeenCalledWith(symbol)
    expect(fetchStockPrice).toHaveBeenCalledWith(symbol)
    expect(store.getActions()[0]).toEqual(requestStock(symbol))
    expect(store.getActions()[1]).toEqual(requestStockSuccess(symbol, payload))
  })

  test('getStockDetails dispatches actions for failure when missing symbol', async () => {
    const symbol = undefined

    await store.dispatch(getStockDetails())
    expect(fetchStockDetails).toHaveBeenCalledWith(symbol)
    expect(fetchStockPrice).toHaveBeenCalledWith(symbol)
    expect(store.getActions()[0]).toEqual(requestStock(symbol))
    expect(store.getActions()[1]).toEqual(requestStockFail(symbol))
  })

  test('getStockList dispatches actions to get a stock list', async () => {
    const list = 'infocus'
    const payload = [
      {
        priceUpdated: expect.any(Number),
        symbol: 'exists',
      },
    ]

    await store.dispatch(getStocksList(list))
    expect(fetchStocksList).toHaveBeenCalledWith(list)
    expect(store.getActions()[0]).toEqual(requestStocksList(list))
    expect(store.getActions()[1]).toEqual(requestStocksListSuccess(payload))
  })

  test('getStockList dispatches actions for failure when list not found or server down', async () => {
    const list = undefined

    await store.dispatch(getStocksList(list))
    expect(fetchStocksList).toHaveBeenCalledWith(list)
    expect(store.getActions()[0]).toEqual(requestStocksList(list))
    expect(store.getActions()[1]).toEqual(requestStocksListFail(list))
  })
})
