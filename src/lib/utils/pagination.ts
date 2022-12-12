export const getPagination = (page: number, size: number) => {
	const limit = size ? +size : 5
	const from = page ? page * limit - limit : 1
	const to = page ? from + size - 1 : size - 1

	return { from, to }
}
