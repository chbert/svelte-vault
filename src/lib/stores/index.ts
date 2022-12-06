import { writable, type Writable } from 'svelte/store'

export const storePackageManager: Writable<string> = writable('npm')
