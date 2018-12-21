import reducer, {
  updatePagination,
  resetPagination,
  goNextPage,
  goPrevPage
} from '../'
import { goToPage, appendPage } from '../actions'

describe('Pagination module', () => {
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
    const action = updatePagination('users', mockPayload)
    const state = reducer(initialState, action)

    expect(state.users.records).toEqual([1, 2, 3, 4])
    expect(state.users.total).toBe(4)
  })
  it('resets pagination to default values', () => {
    const mockPayload = {
      perPage: 10
    }
    const action = resetPagination('users', mockPayload)
    const state = reducer(initialState, action)

    expect(state.users.records).toEqual([])
    expect(state.users.total).toBe(0)
    expect(state.users.perPage).toBe(10)
    expect(state.users.page).toBe(1)
  })
  it('changes the current page to given page', () => {
    const mockPayload = 3
    const action = goToPage('users', mockPayload)
    const state = reducer(initialState, action)

    expect(state.users.page).toEqual(3)
    expect(state.users.records).toEqual([])
  })
  it('appends page', () => {
    const mockPayload = 3
    const action = appendPage('users', mockPayload)
    const state = reducer(initialState, action)

    expect(state.users.page).toEqual(3)
    expect(state.users.records).toEqual([1, 2])
  })
  it('goes next page', () => {
    const action = goNextPage('users')
    const state = reducer(initialState, action)

    expect(state.users.page).toEqual(3)
    expect(state.users.records).toEqual([])
  })
  it('goes prev page', () => {
    const action = goPrevPage('users')
    const state = reducer(initialState, action)

    expect(state.users.page).toEqual(1)
    expect(state.users.records).toEqual([])
  })
  it('goes prev page if possible', () => {
    const action = goPrevPage('users')
    let state = reducer(initialState, action)
    state = reducer(state, action)

    expect(state.users.page).toEqual(1)
    expect(state.users.records).toEqual([])
  })
})
