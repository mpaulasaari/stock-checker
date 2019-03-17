import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'

import StockSelect from './StockSelect'

configure({ adapter: new Adapter() })

describe('StockSelect', () => {
  test('should render the component', () => {
    const wrapper = shallow(<StockSelect />)

    expect(wrapper).toBeTruthy()
  })
})
