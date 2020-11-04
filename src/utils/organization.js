function buildSearchItemInfo(item) {
  const tags = item.tags.map((tag) => tag.name).join('、')
  const combined = [item.identifiers, item.alternative, item.other_names, tags]
  return combined.filter((info) => info).join('、')
}

export { buildSearchItemInfo }
