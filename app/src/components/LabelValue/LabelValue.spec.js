import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'

import LabelValue from './LabelValue'

configure({ adapter: new Adapter() })

describe('LabelValue', () => {
  test('should render the component', () => {
    const wrapper = shallow(<LabelValue />)

    expect(wrapper).toBeTruthy()
  })

  test('should render the label and value', () => {
    const wrapper = shallow(<LabelValue>foo</LabelValue>)

    expect(wrapper.find('.LabelValue-label')).toHaveLength(1)
    expect(wrapper.find('.LabelValue-value')).toHaveLength(1)
  })

  test('should not have loading class by default', () => {
    const wrapper = shallow(<LabelValue />)

    expect(wrapper.find('.loading')).toHaveLength(0)
  })

  test('should add loading class', () => {
    const wrapper = shallow(<LabelValue isLoading />)

    expect(wrapper.find('.loading')).toHaveLength(1)
  })
})
