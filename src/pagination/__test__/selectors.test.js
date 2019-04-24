import * as Selectors from '../selectors'

describe('Pagination - Selectors', () => {
  const mockState = {
    pagination: {
      test: {
        records: [1, 2],
        page: 2,
        total: 2,
        perPage: 20
      }
    }
  }

  it('getCurrentPage(domain, state) returns current page', () => {
    const page = Selectors.getCurrentPage('test', mockState)
    expect(page).toEqual(mockState.pagination.test.page)
  })

  it('getTotal(domain, state) returns the total', () => {
    const total = Selectors.getTotal('test', mockState)
    expect(total).toEqual(mockState.pagination.test.total)
  })

  it('getPerPage(domain, state) returns per page', () => {
    const perPage = Selectors.getPerPage('test', mockState)
    expect(perPage).toEqual(mockState.pagination.test.perPage)
  })

  it('getTotalPages(domain, state) returns total pages', () => {
    const totalPages = Selectors.getTotalPages('test', mockState)
    const { total, perPage } = mockState.pagination.test

    expect(totalPages).toEqual(Math.ceil(total / perPage))
  })

  it('hasPage(domain, page, state) returns if has the page', () => {
    const hasPageOne = Selectors.hasPage('test', 1, mockState)
    const hasPageThree = Selectors.hasPage('test', 3, mockState)

    expect(hasPageOne).toBeTruthy()
    expect(hasPageThree).toBeFalsy()
  })

  it('hasNextPage(domain, state) returns if has the next page', () => {
    const hasNextPage = Selectors.hasNextPage('test', mockState)
    expect(hasNextPage).toBeFalsy()
  })

  it('hasPrevPage(domain, state) returns if has the Previous page', () => {
    const hasPrevPage = Selectors.hasPrevPage('test', mockState)
    expect(hasPrevPage).toBeTruthy()
  })

  it('getResults(domain, state) returns the domain records', () => {
    const records = Selectors.getResults('test', mockState)
    expect(records).toEqual(mockState.pagination.test.records)
  })
})
