import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CreatableSelect from 'react-select/lib/Creatable'

import { CREATABLE_SELECT_ACTION_TYPES } from 'constants/reactSelect'

class StockSelect extends PureComponent {
  formatCreateLabel = symbol => `Get information for ${symbol.toUpperCase()}`

  getValue = () => {
    const { value } = this.props

    if (!value) return null

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
        formatCreateLabel={this.formatCreateLabel}
        isClearable
        isLoading={this.props.isLoading}
        onChange={this.handleChange}
        options={this.props.options}
        placeholder="Select or type..."
        value={this.getValue()}
      />
    )
  }
}

StockSelect.propTypes = {
  isLoading: PropTypes.bool,
  onClear: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.string,
}

StockSelect.defaultProps = {
  isLoading: false,
  onClear: () => null,
  onSelect: () => null,
  options: [],
  value: '',
}

export default StockSelect
