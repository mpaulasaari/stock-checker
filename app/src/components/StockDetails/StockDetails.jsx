import React from 'react'
import PropTypes from 'prop-types'

import LabelValue from 'components/LabelValue'

const StockDetails = ({
  details: {
    description,
    latestPrice,
    symbol,
  },
  isLoading,
  notSelected,
  unknownSymbol,
}) => {
  if (notSelected) {
    return (
      <LabelValue label="Getting started">
        Select or type a stock symbol to see the details
      </LabelValue>
    )
  }

  if (!isLoading && unknownSymbol) {
    return (
      <LabelValue label="Sorry!">
        No stock details found for symbol: {unknownSymbol}
      </LabelValue>
    )
  }

  return (
    <>
      <LabelValue
        isLoading={isLoading}
        label="Symbol"
      >
        {symbol}
      </LabelValue>

      <LabelValue
        isLoading={isLoading}
        label="Current price"
      >
        {latestPrice} USD
      </LabelValue>

      <LabelValue
        isLoading={isLoading}
        label="Description"
      >
        {description}
      </LabelValue>
    </>
  )
}

StockDetails.propTypes = {
  details: PropTypes.shape({
    description: PropTypes.string,
    latestPrice: PropTypes.number,
    symbol: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  notSelected: PropTypes.bool,
  unknownSymbol: PropTypes.string,
}

StockDetails.defaultProps = {
  details: {},
  isLoading: false,
  notSelected: false,
  unknownSymbol: '',
}

export default StockDetails
