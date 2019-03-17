import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'

import Stocks from './Stocks'

configure({ adapter: new Adapter() })

describe('Stocks', () => {
  test('should render the component', () => {
    const wrapper = shallow(<Stocks />)

    expect(wrapper).toBeTruthy()
  })
})
