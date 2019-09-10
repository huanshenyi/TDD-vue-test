import store from '../../../../store'

it(`store changeInputValueのcommit受ける時に,inputValue変化する`, () => {
  const value = '123'
  store.commit('changeInputValue', value)
  expect(store.state.inputValue).toBe(value)
})
