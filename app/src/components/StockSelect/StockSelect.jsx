import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CreatableSelect from 'react-select/lib/Creatable'

// https://react-select.com/props#creatable-props
const CREATABLE_SELECT_ACTION_TYPES = {
  SELECT_OPTION: 'select-option',
  DESELECT_OPTION: 'deselect-option',
  REMOVE_VALUE: 'remove-value',
  POP_VALUE: 'pop-value',
  SET_VALUE: 'set-value',
  CLEAR: 'clear',
  CREATE_OPTION: 'create-option',
}

class StockSelect extends PureComponent {
  getValue = () => {
    const { value } = this.props

    return {
      label: value,
      value,
    }
  }

  handleChange = (selection, actionType) => {
    const { onClear, onSelect } = this.props

    switch (actionType.action) {
      case CREATABLE_SELECT_ACTION_TYPES.CLEAR:
        return onClear()

      case CREATABLE_SELECT_ACTION_TYPES.SELECT_OPTION:
        if (!selection) return false
        return onSelect(selection.label)

      case CREATABLE_SELECT_ACTION_TYPES.CREATE_OPTION:
        return onSelect(selection.label.toUpperCase(), true)

      default:
        return false
    }
  }

  render() {
    return (
      <CreatableSelect
        isClearable
        onChange={this.handleChange}
        options={this.props.options}
        value={this.getValue()}
      />
    )
  }
}

StockSelect.propTypes = {
  onClear: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.string,
}

StockSelect.defaultProps = {
  onClear: () => null,
  onSelect: () => null,
  options: [],
  value: '',
}

export default StockSelect
