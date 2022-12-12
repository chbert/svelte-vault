import { browser } from '$app/environment'
import { writable, type Writable } from 'svelte/store'

const defaultValue = 'npm'
const initialValue = browser
	? window.localStorage.getItem('packageManager') ?? defaultValue
	: defaultValue

const selectedPackageManager: Writable<string> = writable(initialValue)

selectedPackageManager.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('packageManager', value)
	}
})

export default selectedPackageManager
