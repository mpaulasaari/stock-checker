import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount, shallow } from 'enzyme'

import CreatableSelect from 'react-select/lib/Creatable'
import { CREATABLE_SELECT_ACTION_TYPES } from 'constants/reactSelect'
import StockSelect from './StockSelect'

configure({ adapter: new Adapter() })

describe('StockSelect', () => {
  const label = 'foo'
  let props = {}

  beforeEach(() => {
    props = {
      isLoading: false,
      onClear: jest.fn(),
      onSelect: jest.fn(),
    }
  })

  test('should render the component', () => {
    const wrapper = shallow(<StockSelect />)

    expect(wrapper).toBeTruthy()
  })

  test('should call onClear once when CreatableSelect is cleared', () => {
    const payload = [
      { label },
      { action: CREATABLE_SELECT_ACTION_TYPES.CLEAR },
    ]
    const wrapper = mount(<StockSelect {...props} />)

    wrapper.find(CreatableSelect).getElement().props.onChange(...payload)
    expect(wrapper.props().onClear).toBeCalledTimes(1)
  })

  test('should call onSelect properly when CreatableSelect has item selected', () => {
    const payload = [
      { label },
      { action: CREATABLE_SELECT_ACTION_TYPES.SELECT_OPTION },
    ]
    const wrapper = mount(<StockSelect {...props} />)

    wrapper.find(CreatableSelect).getElement().props.onChange(...payload)
    expect(wrapper.props().onSelect).toBeCalledWith(label)
  })

  test('should not call onSelect when CreatableSelect has a change without selection', () => {
    const payload = [
      null,
      { action: CREATABLE_SELECT_ACTION_TYPES.SELECT_OPTION },
    ]
    const wrapper = mount(<StockSelect {...props} />)

    wrapper.find(CreatableSelect).getElement().props.onChange(...payload)
    expect(wrapper.props().onSelect).not.toBeCalled()
  })

  test('should call onSelect properly when CreatableSelect has item created', () => {
    const payload = [
      { label },
      { action: CREATABLE_SELECT_ACTION_TYPES.CREATE_OPTION },
    ]
    const wrapper = mount(<StockSelect {...props} />)

    wrapper.find(CreatableSelect).getElement().props.onChange(...payload)
    expect(wrapper.props().onSelect).toBeCalledWith(label.toUpperCase(), true)
  })

  test('should not call neither function for other action types', () => {
    const payload = [
      { label },
      { action: 'something else' },
    ]
    const wrapper = mount(<StockSelect {...props} />)

    wrapper.find(CreatableSelect).getElement().props.onChange(...payload)
    expect(wrapper.props().onClear).not.toBeCalled()
    expect(wrapper.props().onSelect).not.toBeCalled()
  })
})
