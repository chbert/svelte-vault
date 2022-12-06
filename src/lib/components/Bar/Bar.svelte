<script>
	import { Avatar, LightSwitch, menu } from '@skeletonlabs/skeleton'

	import Logo from '$components/Logo'
</script>

<div class="flex items-center justify-between p-4">
	<h1><Logo /></h1>

	<label for="search">
		<div class="relative text-slate-400 focus-within:text-slate-600">
			<span class="sr-only">Search</span>
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					class="fill-current"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10.2914 1.44C5.94129 1.44 2.42285 5.08875 2.42285 9.6C2.42285 14.1113 5.94129 17.76 10.2914 17.76C11.8445 17.76 13.2819 17.2875 14.5005 16.485L20.185 22.38L22.1521 20.34L16.54 14.535C17.5489 13.1625 18.16 11.4619 18.16 9.6C18.16 5.08875 14.6416 1.44 10.2914 1.44ZM10.2914 3.36C13.6236 3.36 16.3086 6.14438 16.3086 9.6C16.3086 13.0556 13.6236 15.84 10.2914 15.84C6.95921 15.84 4.27428 13.0556 4.27428 9.6C4.27428 6.14438 6.95921 3.36 10.2914 3.36Z"
					></path>
				</svg>
			</div>
			<input
				id="search"
				class="block py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 bg-white border border-transparent rounded-full w-96 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 sm:text-sm"
				placeholder="Search for packages, tutorials, and more"
				type="search"
				name="search"
			/>
		</div>
	</label>
	<div class="flex items-center space-x-4">
		<LightSwitch />
		<button class="text-white btn bg-primary-500 btn-sm">Submit</button>
	</div>
</div>
