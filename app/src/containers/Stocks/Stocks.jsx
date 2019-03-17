import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as R from 'ramda'

import {
  getStockDetails,
  getStocksList,
  clearSelectedStock,
} from 'store/stocks/actions'

import { formatListForSelect } from 'utils/dataParsing'

import StockDetails from 'components/StockDetails'
import StockSelect from 'components/StockSelect'

// Name of the list to be used https://iextrading.com/developer/docs/#list
const STOCKS_LIST = 'infocus'

class Stocks extends PureComponent {
  componentWillMount() {
    this.props.getStocksList(STOCKS_LIST)
  }

  handleStockClear = () => this.props.clearSelectedStock()

  handleStockSelect = symbol => this.props.getStockDetails(symbol)

  render() {
    const {
      stocks: {
        isFetching,
        list,
        selected,
      },
    } = this.props
    // Formatted stock list from store
    const stocksList = formatListForSelect(list)
    // Get details for selected symbol from store
    const stockDetails = R.find(R.propEq('symbol', selected))(list)
    // Symbol was entered but no details received from server
    const unknownSymbol = !stockDetails ? selected : ''

    return (
      <section className="Stocks">
        <StockSelect
          isLoading={isFetching}
          onClear={this.handleStockClear}
          onSelect={this.handleStockSelect}
          options={stocksList}
          value={selected}
        />

        <StockDetails
          details={stockDetails}
          emptyList={!stocksList.length}
          isLoading={isFetching}
          notSelected={!selected}
          unknownSymbol={unknownSymbol}
        />
      </section>
    )
  }
}

Stocks.propTypes = {
  getStockDetails: PropTypes.func.isRequired,
  getStocksList: PropTypes.func.isRequired,
  stocks: PropTypes.shape({
    isFetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.shape({})),
    selected: PropTypes.string,
  }).isRequired,
  clearSelectedStock: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  stocks: state.stocks,
})

const mapDispatchToProps = dispatch => ({
  getStockDetails: payload => dispatch(getStockDetails(payload)),
  getStocksList: payload => dispatch(getStocksList(payload)),
  clearSelectedStock: payload => dispatch(clearSelectedStock(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Stocks)
