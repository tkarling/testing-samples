async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}

export const FETCHED_VALUE = 5
export const getValue = () => stall().then(() => FETCHED_VALUE)
