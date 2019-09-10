const undoList = { data: [
  { status: 'div', value: 'dell' },
  { status: 'div', value: 'lee' }]
}

export default {
  get (url) {
    if (url === '/getUndoList.json') {
      return new Promise((resolve) => {
        resolve(undoList)
      })
    }
  }
}
