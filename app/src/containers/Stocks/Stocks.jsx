import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getStockDetails,
  getStockDetailsAndPrice,
  getStocksList,
  clearSelectedStock,
} from 'store/stocks/actions'

import StockDetails from 'components/StockDetails'
import StockSelect from 'components/StockSelect'

const mapStocksList = list => (
  list.map(({ symbol }) => (
    {
      label: symbol,
      value: symbol,
    }
  ))
)

class Stocks extends PureComponent {
  componentDidMount() {
    this.props.getStocksList('infocus')
  }

  handleStockClear = () => this.props.clearSelectedStock()

  handleStockSelect = (symbol, isNew) => {
    if (isNew) return this.props.getStockDetailsAndPrice(symbol)

    return this.props.getStockDetails(symbol)
  }

  findStockDetails = () => {
    const {
      stocks: {
        list,
        selected,
      },
    } = this.props

    return list.find(listItem => listItem.symbol === selected)
  }

  render() {
    const {
      stocks: {
        isFetching,
        list,
        selected,
      },
    } = this.props
    const stocksList = mapStocksList(list)
    const stockDetails = this.findStockDetails()
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
  getStockDetailsAndPrice: PropTypes.func.isRequired,
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
  getStockDetailsAndPrice: payload => dispatch(getStockDetailsAndPrice(payload)),
  getStocksList: payload => dispatch(getStocksList(payload)),
  clearSelectedStock: payload => dispatch(clearSelectedStock(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Stocks)
