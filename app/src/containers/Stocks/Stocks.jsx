import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getStockDetails,
  getStockDetailsAndPrice,
  getStocksList,
  clearSelectedStock,
} from '../../store/stocks/actions'

import StockDetails from '../../components/StockDetails'
import StockSelect from '../../components/StockSelect'

import './Stocks.scss'

const mapStockList = list => (
  list.map(listItem => (
    {
      label: listItem.symbol,
      value: listItem.symbol,
    }
  ))
)

class Stocks extends PureComponent {
  componentDidMount() {
    this.props.getStocksList()
  }

  handleStockClear = () => this.props.clearSelectedStock('')

  handleStockSelect = (symbol, isNew) => {
    if (isNew) return this.props.getStockDetailsAndPrice(symbol)

    return this.props.getStockDetails(symbol)
  }

  getStockDetails = () => {
    const { list, selected } = this.props.stocks

    return list.find(listItem => listItem.symbol === selected)
  }

  render() {
    const { stocks, stocks: { isFetching, selected } } = this.props
    const stockList = mapStockList(stocks.list)
    const stockDetails = this.getStockDetails()
    const stockNotFound = !stockDetails ? selected : ''

    return (
      <section className="Stocks">
        <StockSelect
          isLoading={isFetching}
          onClear={this.handleStockClear}
          onSelect={this.handleStockSelect}
          options={stockList}
          value={selected}
        />

        <div className="Stocks-details">
          <StockDetails
            isLoading={isFetching}
            notFound={stockNotFound}
            notSelected={!selected}
            details={stockDetails}
          />
        </div>
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
  getStocksList: () => dispatch(getStocksList()),
  clearSelectedStock: payload => dispatch(clearSelectedStock(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Stocks)
