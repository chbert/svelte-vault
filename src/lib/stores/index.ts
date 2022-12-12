import { writable, type Writable } from 'svelte/store'

export const daysStore: Writable<number> = writable(0)
export const downloadsStore: Writable<number> = writable(0)
export const termStore: Writable<string> = writable('')
export const categoryStore: Writable<number> = writable(0)
export const sortStore: Writable<string> = writable('full_name')
export const pageSizeStore: Writable<number> = writable(5)

export const entriesStore: Writable<any> = writable(null)
export const totalEntriesStore: Writable<number> = writable(0)
export const categoriesStore: Writable<any> = writable(null)
export const categoriesEntriesStore: Writable<any> = writable(0)

export const submissionsModalStore: Writable<boolean> = writable(false)
