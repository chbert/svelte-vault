export declare type Data = {
	title: string
	description: string
	homepage: string
	url: string
	npm_package: string
	npm_downloads_last_week: number
	license: License
	stars: number
	open_issues: number
	updated: string
}

export declare type License = {
	key: string
	name: string
	spdx_id: string
	url: string
	node_id: string
}
