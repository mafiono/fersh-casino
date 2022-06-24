import moment from 'moment'
import { PREVIOUSLY, TODAY, YESTERDAY } from '@/constants'

/**
 * Группировка сообщение по датам, когда они пришли.
 * Варианты групп: Сегодня, Вчера и Ранее
 * @param { array } listByCategory
 * @returns { object } { key:[] }
 */
export const groupMessagesList = (listByCategory, item) => {
  const groupedList = {}

  item.message.transactionTime = function () {

  }
  listByCategory.map((item) => {
    item.broadcastingTime = undefined;
    const parseDate = parseInt(item.message.transactionTime) || parseInt(item.broadcastingTime)

    const groupDate = moment(parseDate * 1000)
    let groupName = PREVIOUSLY

    if (moment().format('DD-MM-YYYY') === groupDate.format('DD-MM-YYYY')) {
      groupName = TODAY
    }

    if (moment().subtract(1, 'd').format('DD-MM-YYYY') === groupDate.format('DD-MM-YYYY')) {
      groupName = YESTERDAY
    }

    if (groupedList[groupName]) {
      groupedList[groupName].push(item)
    } else {
      groupedList[groupName] = [item]
    }
    return groupedList
  })

  return groupedList
}
