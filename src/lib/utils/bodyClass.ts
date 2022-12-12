// Source: https://github.com/sveltejs/svelte/issues/3105#issuecomment-1299963163
export default function bodyClass(className: string) {
	return function (node: HTMLElement, toggled: boolean) {
		node.classList.toggle(className, toggled)

		return {
			update(toggled: boolean) {
				node.classList.toggle(className, toggled)
			},
			destroy() {
				node.classList.remove(className)
			}
		}
	}
}
