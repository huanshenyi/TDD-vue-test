<template>
    <div>
      <Header @add="addUndoItem"/>
      <UndoList
        :list="undoList"
                @delete="handleItemDelete"
                @status="changeStatus"
                @reset="resetStatus"
                @change="changeItemValue"
      />
    </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header'
import UndoList from './components/UndoList'

export default {
  name: 'TodoList',
  components: {
    Header,
    UndoList
  },
  data () {
    return {
      undoList: []
    }
  },
  mounted () {
    axios.get('/getUndoList.json').then((res) => {
      this.undoList = res.data
    }).catch(e => {
      // console.log(e)
    })
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({
        status: 'div',
        value: inputValue
      })
    },
    handleItemDelete (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          newList.push({ status: 'input', value: item.value })
        } else {
          newList.push({ status: 'div', value: item.value })
        }
      })
      this.undoList = newList
    },
    resetStatus () {
      const newList = []
      this.undoList.forEach((item) => {
        newList.push({ status: 'div', value: item.value })
      })
      this.undoList = newList
    },
    changeItemValue (obj) {
      this.undoList[obj.index].value = obj.value
    }
  }
}
</script>

<style scoped>

</style>
