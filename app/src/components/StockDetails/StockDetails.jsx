import React from 'react'
import PropTypes from 'prop-types'

import LabelValue from 'components/LabelValue'

const StockDetails = (props) => {
  const {
    details: {
      description,
      latestPrice,
      symbol,
    },
    isLoading,
    notFound,
    notSelected,
  } = props

  if (notSelected) {
    return <div>Select or type a stock symbol to show details</div>
  }

  if (!isLoading && notFound) {
    return (
      <div>
        No stock details found for symbol {notFound}
      </div>
    )
  }

  return (
    <div className="StockDetails">
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
    </div>
  )
}

StockDetails.propTypes = {
  details: PropTypes.shape({
    description: PropTypes.string,
    latestPrice: PropTypes.number,
    symbol: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  notFound: PropTypes.string,
  notSelected: PropTypes.bool,
}

StockDetails.defaultProps = {
  details: {},
  isLoading: false,
  notFound: '',
  notSelected: false,
}

export default StockDetails
