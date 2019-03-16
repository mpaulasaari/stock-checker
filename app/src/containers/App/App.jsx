import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getStockInfo,
  getStockInfoAndPrice,
  getStocksList,
  clearSelectedStock,
} from '../../store/stocks/actions'

import StockSelect from '../../components/StockSelect'

const mapStockList = list => (
  list.map(listItem => (
    {
      label: listItem.symbol,
      value: listItem.symbol,
    }
  ))
)

class App extends Component {
  componentDidMount() {
    this.props.getStocksList()
  }

  handleStockClear = () => this.props.clearSelectedStock('')

  handleStockSelect = (symbol, isNew) => {
    if (isNew) return this.props.getStockInfoAndPrice(symbol)

    return this.props.getStockInfo(symbol)
  }

  getStockDetails = () => {
    const { list, selected } = this.props.stocks

    return list.find(listItem => listItem.symbol === selected)
  }

  render() {
    const { stocks } = this.props
    const stockList = mapStockList(stocks.list)
    const stockDetails = this.getStockDetails()

    return (
      <div>
        <StockSelect
          onClear={this.handleStockClear}
          onSelect={this.handleStockSelect}
          options={stockList}
          value={this.props.stocks.selected}
        />

        {stockDetails && stockDetails.latestPrice}
      </div>
    )
  }
}

App.propTypes = {
  getStockInfo: PropTypes.func.isRequired,
  getStockInfoAndPrice: PropTypes.func.isRequired,
  getStocksList: PropTypes.func.isRequired,
  stocks: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    selected: PropTypes.string,
  }).isRequired,
  clearSelectedStock: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  stocks: state.stocks,
})

const mapDispatchToProps = dispatch => ({
  getStockInfo: payload => dispatch(getStockInfo(payload)),
  getStockInfoAndPrice: payload => dispatch(getStockInfoAndPrice(payload)),
  getStocksList: () => dispatch(getStocksList()),
  clearSelectedStock: payload => dispatch(clearSelectedStock(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
