import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)

    deepFreeze(state)

    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('reset sets everything to zero', () => {
    const good_action = {
      type: 'GOOD'
    }
    const ok_action = {
      type: 'OK'
    }
    const bad_action = {
      type: 'BAD'
    }
    const reset_action = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)

    let newState = counterReducer(state, good_action)
    newState = counterReducer(newState, ok_action)
    newState = counterReducer(newState, bad_action)

    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    newState = counterReducer(newState, reset_action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
