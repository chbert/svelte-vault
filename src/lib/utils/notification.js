export function showSnackbar(title, message, emoji, icon, close) {
	const event = new CustomEvent('showSnackbar', {
		detail: { title: title, message: message, emoji: emoji, icon: icon, close: close }
	})

	dispatchEvent(event)
}

export function hideSnackbar() {
	dispatchEvent(new Event('hideSnackbar'))
}

import { writable } from 'svelte/store'

export const notifications = writable([])

export const addNotification = (notification) => {
	// Create a unique ID so we can easily find/remove it
	// if it is dismissible/has a timeout.
	const id = Math.floor(Math.random() * 10000)

	// Setup some sensible defaults for a notification.
	const defaults = {
		id,
		intent: 'info',
		dismissible: true,
		timeout: 2000
	}

	// Push the notification to the top of the list of notifications
	notifications.update((all) => [{ ...defaults, ...notification }, ...all])

	// If notification is dismissible, dismiss it after "timeout" amount of time.
	if (notification.timeout || defaults.timeout)
		setTimeout(() => dismissNotification(id), notification.timeout || defaults.timeout)
}

export const dismissNotification = (id) => {
	notifications.update((all) => all.filter((t) => t.id !== id))
}
