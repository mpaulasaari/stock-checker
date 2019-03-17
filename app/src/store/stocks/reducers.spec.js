/* eslint-disable import/first */
jest.mock('utils/dataParsing', () => ({
  mergeList: jest.fn((list, symbol, details) => ({ list, symbol, details })),
}))

import {
  GET_STOCK_DETAILS,
  GET_STOCK_DETAILS_SUCCESS,
  GET_STOCK_DETAILS_FAIL,
  CLEAR_SELECTED_STOCK,
  GET_STOCKS_LIST,
  GET_STOCKS_LIST_SUCCESS,
  GET_STOCKS_LIST_FAIL,
} from 'constants/actionTypes'

import stocksReducer from './reducers'

describe('stocks reducers', () => {
  it(`${GET_STOCK_DETAILS} should return proper results`, () => {
    const symbol = 'foo'
    const action = {
      symbol,
      type: GET_STOCK_DETAILS,
    }
    const endState = {
      isFetching: true,
      selected: symbol,
    }

    const state = stocksReducer({}, action)
    expect(state).toEqual(endState)
  })

  it(`${GET_STOCK_DETAILS_SUCCESS} should return proper results`, () => {
    const list = []
    const details = { foo: 'bar' }
    const symbol = 'foo'
    const action = {
      symbol,
      details,
      type: GET_STOCK_DETAILS_SUCCESS,
    }
    const endState = {
      isFetching: false,
      list: {
        list,
        details,
        symbol,
      },
    }

    const state = stocksReducer({ list }, action)
    expect(state).toEqual(endState)
  })

  it(`${GET_STOCK_DETAILS_FAIL} should return proper results`, () => {
    const action = {
      type: GET_STOCK_DETAILS_FAIL,
    }
    const endState = {
      isFetching: false,
    }

    const state = stocksReducer({}, action)
    expect(state).toEqual(endState)
  })

  it(`${CLEAR_SELECTED_STOCK} should return proper results`, () => {
    const action = {
      type: CLEAR_SELECTED_STOCK,
    }
    const endState = {
      selected: '',
    }

    const state = stocksReducer({}, action)
    expect(state).toEqual(endState)
  })

  it(`${GET_STOCKS_LIST} should return proper results`, () => {
    const list = 'foo'
    const action = {
      list,
      type: GET_STOCKS_LIST,
    }
    const endState = {
      isFetching: true,
    }

    const state = stocksReducer({}, action)
    expect(state).toEqual(endState)
  })

  it(`${GET_STOCKS_LIST_SUCCESS} should return proper results`, () => {
    const list = 'foo'
    const action = {
      list,
      type: GET_STOCKS_LIST_SUCCESS,
    }
    const endState = {
      isFetching: false,
      list,
    }

    const state = stocksReducer({ list }, action)
    expect(state).toEqual(endState)
  })

  it(`${GET_STOCKS_LIST_FAIL} should return proper results`, () => {
    const action = {
      type: GET_STOCKS_LIST_FAIL,
    }
    const endState = {
      isFetching: false,
    }

    const state = stocksReducer({}, action)
    expect(state).toEqual(endState)
  })

  it('default should return proper results', () => {
    const action = {
      type: '',
    }
    const endState = {}

    const state = stocksReducer({}, action)
    expect(state).toEqual(endState)
  })
})
