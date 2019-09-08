import { mount } from '@vue/test-utils'
import { findTestWrapper } from '../../../../utils/testUtils'
import TodoList from '../../TodoList'
import store from '../../../../store'

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
