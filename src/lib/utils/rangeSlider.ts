export const getDateRange = (value: number) => {
	switch (value) {
		case 0:
			return 'Any'
		case 1:
			return 'Today'
		case 2:
			return 'Yesterday'
		case 3:
			return `Last 3 days`
		case 4:
			return `Last 4 days`
		case 5:
			return `Last 5 days`
		case 6:
			return `Last 6 days`
		case 7:
			return 'Last week'
		case 8:
			return 'Last 2 weeks'
		case 9:
			return 'Last 3 weeks'
		case 10:
			return 'Last month'
		case 11:
			return 'Last 2 months'
		case 12:
			return 'Last Quarter'
		case 13:
			return 'Last half year'
		case 14:
			return 'Last year'
		case 15:
			return 'More than a year'
	}

	return 'Any'
}

export const getDateRangeDays = (value: number) => {
	switch (value) {
		case 0:
			return -1
		case 1:
			return 1
		case 2:
			return 2
		case 3:
			return 3
		case 4:
			return 4
		case 5:
			return 5
		case 6:
			return 6
		case 7:
			return 7
		case 8:
			return 14
		case 9:
			return 21
		case 10:
			return 30
		case 11:
			return 60
		case 12:
			return 90
		case 13:
			return 180
		case 14:
			return 365
		case 15:
			return 366
	}

	return 0
}

export const getDownloadsRange = (value: number) => {
	switch (value) {
		case 0:
			return 'Any'
		case 1:
			return '100+'
		case 2:
			return '1000+'
		case 3:
			return `${(10000).toLocaleString()}+`
		case 4:
			return `${(100000).toLocaleString()}+`
		case 5:
			return `${(1000000).toLocaleString()}+`
		case 6:
			return `${(10000000).toLocaleString()}+`
	}

	return 'Any'
}

export const getDownloads = (value: number) => {
	if (value === 0) return -1

	return Math.pow(10, value)
}
