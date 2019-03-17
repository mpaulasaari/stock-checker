import {
  addPriceUpdated,
  formatListForSelect,
  formatSelectItems,
  mergeList,
  parseStockData,
} from './dataParsing'

describe('data parsing', () => {
  it('parseStockData should return proper results', () => {
    const object = {
      description: 'description',
      latestPrice: 123,
      priceUpdated: 123,
      symbol: 'symbol',
    }
    const extras = { foo: 'bar', asd: 'qwe' }

    const hasValid = parseStockData(object)
    expect(hasValid).toEqual(object)

    const hasExtras = parseStockData({ ...object, ...extras })
    expect(hasExtras).toEqual(
      expect.not.objectContaining(extras),
    )
  })

  it('addPriceUpdated should add proper data', () => {
    const stock = { foo: 'bar' }

    const hasPriceUpdated = addPriceUpdated(stock)
    expect(hasPriceUpdated).toHaveProperty('priceUpdated')
  })

  it('mergeList should return proper array', () => {
    const list = [{ symbol: 'foo' }, { symbol: 'bar' }]
    const update = { description: 'example' }
    const newSymbol = { symbol: 'asd' }

    const hasExistingSymbol = mergeList(list, 'foo', update)
    expect(hasExistingSymbol[0]).toEqual(
      expect.objectContaining(update),
    )

    const hasNewSymbol = mergeList(list, 'asd', newSymbol)
    expect(hasNewSymbol).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newSymbol),
      ]),
    )
  })

  it('formatSelectItems should return proper object and handle failure', () => {
    const name = 'foo'

    const hasValidName = formatSelectItems(name)
    expect(hasValidName).toEqual({ label: name, value: name })

    const hasNoName = formatSelectItems()
    expect(hasNoName).toEqual(null)
  })

  it('formatSelectItems should return proper object and handle failure', () => {
    const name = 'foo'
    const list = [{ symbol: name }]

    const hasValidList = formatListForSelect(list)
    expect(hasValidList).toEqual([{ label: name, value: name }])

    const hasNoList = formatListForSelect([])
    expect(hasNoList).toEqual([])
  })
})
