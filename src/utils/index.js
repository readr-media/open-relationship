const getRandomId = (count) => Math.floor(Math.random() * count + 1)

function handleRelationMany(items) {
  const data = {}
  const createItems = items.filter((item) => item.action === 'create')
  const connectItems = items.filter((item) => item.action === 'connect')
  const disconnectItems = items.filter((item) => item.action === 'disconnect')
  if (createItems.length > 0) {
    data.create = createItems.map((item) => ({ name: item.name }))
  }
  if (connectItems.length > 0) {
    data.connect = connectItems
      .filter((item) => item.id)
      .map((item) => ({ id: item.id }))
  }
  if (disconnectItems.length > 0) {
    data.disconnect = disconnectItems
      .filter((item) => item.id)
      .map((item) => ({ id: item.id }))
  }
  return data
}

export { getRandomId, handleRelationMany }
