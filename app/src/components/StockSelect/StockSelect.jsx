import React from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/lib/Creatable'

import { formatSelectItems } from 'utils/dataParsing'

import { CREATABLE_SELECT_ACTION_TYPES } from 'constants/reactSelect'

const StockSelect = ({
  isLoading,
  onClear,
  onSelect,
  options,
  value,
}) => {
  const handleChange = (selection, { action }) => {
    switch (action) {
      // Selection was cleared
      case CREATABLE_SELECT_ACTION_TYPES.CLEAR:
        return onClear()

      // Item was selected from the list
      case CREATABLE_SELECT_ACTION_TYPES.SELECT_OPTION:
        if (!selection) return false // Prevent action without selection
        return onSelect(selection.label)

      // New item was created
      case CREATABLE_SELECT_ACTION_TYPES.CREATE_OPTION:
        return onSelect(selection.label.toUpperCase(), true)

      // Something else happened, no action
      default:
        return false
    }
  }
  const formatCreateLabel = symbol => `Get details for ${symbol.toUpperCase()}`
  const noOptionsMessage = () => 'No stocks found'
  const formattedValue = formatSelectItems(value)
  const placeholder = 'Select or type...'

  return (
    <CreatableSelect
      formatCreateLabel={formatCreateLabel}
      isClearable
      isLoading={isLoading}
      noOptionsMessage={noOptionsMessage}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      value={formattedValue}
    />
  )
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
