import { writable, type Writable } from 'svelte/store'

export const days: Writable<number> = writable(0)
export const downloads: Writable<number> = writable(0)
export const term: Writable<string> = writable('')
export const category: Writable<number> = writable(0)
