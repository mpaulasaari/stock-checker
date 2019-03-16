import React from 'react'
import PropTypes from 'prop-types'
import CreatableSelect from 'react-select/lib/Creatable'

import { CREATABLE_SELECT_ACTION_TYPES } from 'constants/reactSelect'

const StockSelect = ({
  isLoading,
  onClear,
  onSelect,
  options,
  value,
}) => {
  const formatCreateLabel = symbol => (
    `Get details for ${symbol.toUpperCase()}`
  )

  const getValue = () => {
    if (!value) return null

    return {
      label: value,
      value,
    }
  }

  const handleChange = (selection, actionType) => {
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

  return (
    <CreatableSelect
      formatCreateLabel={formatCreateLabel}
      isClearable
      isLoading={isLoading}
      onChange={handleChange}
      options={options}
      placeholder="Select or type..."
      value={getValue()}
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
