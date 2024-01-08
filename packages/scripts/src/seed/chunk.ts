export const chunk = <T>(input: Array<T>, size = 1): Array<Array<T>> => {
  return input.reduce<Array<Array<T>>>((result, item, index) => {
    const chunkIndex = Math.floor(index / size)

    if (result[chunkIndex] == null) {
      result[chunkIndex] = []
    }

    result[chunkIndex].push(item)
    return result
  }, [])
}
