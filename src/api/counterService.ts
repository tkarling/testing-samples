async function stall(stallTime = 1000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}

const APP_ID = 'TEST_SAMPLES'
export default class counterService {
  static COUNTER_ID = 'counterId'
  static getId(storeId: string) {
    return APP_ID + ', ' + storeId + ': ' + counterService.COUNTER_ID
  }

  static getCounter(storeId: string) {
    return stall().then(() =>
      Number(localStorage.getItem(counterService.getId(storeId)))
    )
  }
  static setCounter(storeId: string, counter: number) {
    return stall().then(() => {
      localStorage.setItem(counterService.getId(storeId), counter + '')
      return this.getCounter(storeId)
    })
  }
}
