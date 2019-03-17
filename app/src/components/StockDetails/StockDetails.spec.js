import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'

import StockDetails, {
  emptyListText,
  unknownSymbolText,
  notSelectedText,
} from './StockDetails'

configure({ adapter: new Adapter() })

describe('StockDetails', () => {
  test('should render the component', () => {
    const wrapper = shallow(<StockDetails />)

    expect(wrapper).toBeTruthy()
  })

  test('should render details correctly', () => {
    const details = {
      description: 'exampleText',
      latestPrice: 123,
      symbol: 'exampleText',
    }
    const wrapper = shallow(<StockDetails details={details} />)

    expect(wrapper.html()).toContain('exampleText')
  })

  test('should render loading state', () => {
    const wrapper = shallow(<StockDetails isLoading />)

    expect(wrapper.html()).toContain('loading')
  })

  test('should render empty list text', () => {
    const wrapper = shallow(<StockDetails emptyList />)

    expect(wrapper.html()).toContain(emptyListText)
  })

  test('should render unknown symbol text', () => {
    const wrapper = shallow(<StockDetails unknownSymbol="foo" />)

    expect(wrapper.html()).toContain(unknownSymbolText)
  })

  test('should render not selected text', () => {
    const wrapper = shallow(<StockDetails notSelected />)

    expect(wrapper.html()).toContain(notSelectedText)
  })
})
