import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)

export const formatTime = (date, relative = false, format = 'dddd, MMMM D, YYYY') => {
	if (relative) {
		return dayjs.utc(date).fromNow()
	}

	return dayjs.utc(date).format(format)
}

export default formatTime
