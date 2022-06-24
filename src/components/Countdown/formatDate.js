export const formatDate = (distance) => {
  let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString()
  days = days < 10 ? '0' + days : days.toString()

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  hours = hours < 10 ? '0' + hours : hours.toString()

  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  minutes = minutes < 10 ? '0' + minutes : minutes.toString()

  let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString()
  seconds = seconds < 10 ? '0' + seconds : seconds.toString()

  return { days, hours, minutes, seconds }
}
