import { mount } from '@vue/test-utils'
import { findTestWrapper } from '../../../../utils/testUtils'
import TodoList from '../../TodoList'
import store from '../../../../store'
import axios from '../../__mocks__/axios'

// 元のコードのタイマーを入れ替える
// 実行するたびにfaketimerをリセット、しなければ、testの間に実行数が累計される
beforeEach(() => {
  axios.success = true
  jest.useFakeTimers()
})

it(`
  1.ユーザーinputでvalueを入力、
  2.ユーザーはEnterKeyを押す、
  3.リストはユーザー入力内容をadd
`, () => {
  const wrapper = mount(TodoList, { store })
  const inputElem = findTestWrapper(wrapper, 'header-input').at(0)
  const content = 'Dell lee'
  inputElem.setValue(content)
  // inputElem.trigger('change')
  inputElem.trigger('keyup.enter')
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toBe(1)
  expect(listItems.at(0).text()).toContain(content)
})

// 非同期処理のテスト
it(`
1. ページ開く時に、apiデータを取得
2.apiデータをページに表示
`, (done) => {
  const wrapper = mount(TodoList, { store })
  // $nextTick->少し待つ、非同期コード実行させる
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(2)
    done()
  })
})
it(`
1.ページ開く時に、apiデータを取得失敗
2.その後空のリストを表示、downするわけではない
`, (done) => {
  axios.success = false
  const wrapper = mount(TodoList, { store })
  // $nextTick->少し待つ、非同期コード実行させる
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(0)
    done()
  })
})
