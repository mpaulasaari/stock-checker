import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'

import LabelValue from './LabelValue'

configure({ adapter: new Adapter() })

describe('LabelValue', () => {
  test('renders the component', () => {
    const subject = shallow(<LabelValue>button</LabelValue>)

    expect(subject).toBeTruthy()
  })
})
