import { writable, type Writable } from 'svelte/store'

export const daysStore: Writable<number> = writable(0)
export const downloadsStore: Writable<number> = writable(0)
export const termStore: Writable<string> = writable('')
export const sortStore: Writable<string> = writable('title')
export const pageSizeStore: Writable<number> = writable(5)
export const totalPagesStore: Writable<number> = writable(0)

export const entriesStore: Writable<any> = writable(null)
export const totalEntriesStore: Writable<any> = writable(null)

export const submissionsModalStore: Writable<boolean> = writable(false)
