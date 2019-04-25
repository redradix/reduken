import reducer from '../reducer'
import * as Actions from '../actions'
import * as Selectors from '../selectors'

describe('Pagination Module', () => {
  const initialState = {
    users: {
      records: [1, 2],
      page: 2,
      total: 2,
      perPage: 20
    }
  }

  it('Exports by default a reducer', () => {
    expect(reducer).toBeInstanceOf(Function)
  })

  it('updates pagination with new page records and page number', () => {
    const mockPayload = {
      records: [1, 2, 3, 4],
      page: 2,
      total: 4
    }
    const action = Actions.updatePagination('users', mockPayload)
    const pagination = reducer(initialState, action)

    expect(Selectors.getResults('users', { pagination })).toEqual([1, 2, 3, 4])
    expect(Selectors.getTotal('users', { pagination })).toBe(4)
  })
  it('resets pagination to default values', () => {
    const mockPayload = {
      perPage: 10
    }
    const action = Actions.resetPagination('users', mockPayload)
    const pagination = reducer(initialState, action)

    expect(Selectors.getResults('users', { pagination })).toEqual([])
    expect(Selectors.getTotal('users', { pagination })).toBe(0)
    expect(Selectors.getPerPage('users', { pagination })).toBe(10)
    expect(Selectors.getCurrentPage('users', { pagination })).toBe(1)
  })
  it('changes the current page to given page', () => {
    const mockPayload = 3
    const action = Actions.goToPage('users', mockPayload)
    const pagination = reducer(initialState, action)

    expect(Selectors.getCurrentPage('users', { pagination })).toEqual(3)
    expect(Selectors.getResults('users', { pagination })).toEqual([])
  })
  it('appends page', () => {
    const mockPayload = 3
    const action = Actions.appendPage('users', mockPayload)
    const pagination = reducer(initialState, action)

    expect(Selectors.getCurrentPage('users', { pagination })).toEqual(3)
    expect(Selectors.getResults('users', { pagination })).toEqual([1, 2])
  })
  it('goes next page', () => {
    const action = Actions.goNextPage('users')
    const pagination = reducer(initialState, action)

    expect(Selectors.getCurrentPage('users', { pagination })).toEqual(3)
    expect(Selectors.getResults('users', { pagination })).toEqual([])
  })
  it('goes prev page', () => {
    const action = Actions.goPrevPage('users')
    const pagination = reducer(initialState, action)

    expect(Selectors.getCurrentPage('users', { pagination })).toEqual(1)
    expect(Selectors.getResults('users', { pagination })).toEqual([])
  })
  it('goes prev page if possible', () => {
    const action = Actions.goPrevPage('users')
    let pagination = reducer(initialState, action)
    pagination = reducer(pagination, action)

    expect(Selectors.getCurrentPage('users', { pagination })).toEqual(1)
    expect(Selectors.getResults('users', { pagination })).toEqual([])
  })
})
