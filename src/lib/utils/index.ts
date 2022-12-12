export const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
export const uniqueID = Math.floor(Math.random() * 100)

import { browser } from '$app/environment'

export const filterByValue = (array: any[], string: string) => {
	return array.filter((entry: any) =>
		entry
			.keys(entry)
			.some((key: string) => entry[`${key}`].toLowerCase().includes(string.toLowerCase()))
	)
}

export const filterByKeyValue = (array: [], key: string, string: string, single = false) => {
	let filtered

	if (!string) throw new Error('No string provided')
	if (!key) throw new Error('No key provided')

	if (single) {
		filtered = array.find((entry) => entry[`${key}`] === string) || {}
	} else {
		filtered =
			array.filter((entry: any) => entry[`${key}`].toLowerCase().includes(string.toLowerCase())) ||
			[]
	}

	return filtered
}

export const replaceValueByKeyValue = (
	array: any[],
	searchKey: string,
	searchString: string,
	replacementKey: string,
	replacementString: string
) => {
	return array.map((entry) => {
		if (entry[`${searchKey}`] === searchString) {
			return { ...entry, [`${replacementKey}`]: replacementString }
		}

		return entry
	})
}

export const replaceObjectByKeyValue = (
	array: any[],
	searchKey: string,
	searchString: string,
	replacementObject: {},
	addMissing = false
) => {
	// Find entry
	const entry = array.find((entry) => entry[`${searchKey}`] === searchString)

	// If entry is found, replace it
	if (entry) {
		const index = array.indexOf(entry)
		array[index] = { ...replacementObject }
	} else if (addMissing) {
		array.push(replacementObject)
	}

	return array
}

export const filterByArrayValues = (array: any[], criterias: any[], key: string) => {
	criterias.forEach((criteria) => {
		let index = array.findIndex((entry) => entry[key] === criteria[key])
		array = array.splice(index, 1)
	})

	return array
}

export const arrayRemoveByValue = (array: any[], value: string) => {
	return array.filter(function (element) {
		return element != value
	})
}

export const reduceArray = (array: any[]) => {
	return array.filter((element) => (isEmptyObject(element) ? null : element))
}

export const capitalize = (string: string) => {
	if (typeof string !== 'string') return ''

	return string.charAt(0).toUpperCase() + string.slice(1)
}

export const convertRemToPixels = (rem: number) => {
	return browser ? rem * parseFloat(getComputedStyle(document.documentElement).fontSize) : null
}

export const isEmptyObject = (object: {}) => {
	return (
		object && // 👈 null and undefined check
		Object.keys(object).length === 0 &&
		Object.getPrototypeOf(object) === Object.prototype
	)
}

export const reduceObject = (entry: any) => {
	return entry.values(entry).filter((entry: any) => entry)
}

export const sortArrayByKeyValue = (array: any[], orderBy = 'id', ascending = true) => {
	array.sort((a, b) => {
		if (ascending) {
			return a[orderBy].localeCompare(b[orderBy])
		} else {
			return b[orderBy].localeCompare(a[orderBy])
		}
	})

	return array
}

export const getUrlExtension = (url: any) => {
	return url.split(/[#?]/)[0].split('.').pop().trim()
}
