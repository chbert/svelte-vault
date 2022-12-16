<script lang="ts">
	import type { PageData, ActionData } from './$types'

	import { toast } from '@zerodevx/svelte-toast'

	import { enhance } from '$app/forms'

	export let form: ActionData

	$: selected = ''

	if (form?.success) {
		toast.push('Successfully submitted!')
	}
</script>

<form method="POST" action="?/add" use:enhance>
	<h1 class="header">Add ressource</h1>
	<div class="form-widget">
		<section>
			<label>
				Category
				<select name="category" required bind:value={selected}>
					<option value="" selected>Select a category...</option>
					<option value="packages"> Packages </option>
					<option value="repositories"> Repositories </option>
					<option value="videos"> Videos </option>
					<option value="articles"> Articles </option>
				</select>
				{#if form?.missingCategory}<p class="error">Category is required</p>{/if}
			</label>
		</section>
		<section>
			{#if selected === 'repositories' || selected === 'packages'}
				<label>
					Repository
					<input class="inputField" name="repositoryUrl" type="text" placeholder="Repository URL" />
					{#if form?.missingRepositoryUrl}<p class="error">Repository is required</p>{/if}
				</label>
				{#if selected === 'packages'}
					<label>
						Package
						<input class="inputField" name="npmPackage" type="text" placeholder="NPM Package" />
						{#if form?.missingNpmPackage}<p class="error">Package is required</p>{/if}
					</label>
				{/if}
			{:else if selected === 'videos'}
				<label>
					Video
					<input class="inputField" name="videoUrl" type="text" placeholder="Video URL" />
					{#if form?.missingVideoUrl}<p class="error">Video is required</p>{/if}
				</label>
			{:else if selected === 'articles'}
				<label>
					Article
					<input class="inputField" name="articleUrl" type="text" placeholder="Article URL" />
					{#if form?.missingArticleUrl}<p class="error">Article is required</p>{/if}
				</label>

				<label>
					Article Title
					<input class="inputField" name="articleTitle" type="text" placeholder="Article Title" />
					{#if form?.missingArticleTitle}<p class="error">Article Title is required</p>{/if}
				</label>

				<label>
					Article Description
					<input
						class="inputField"
						name="articleDescription"
						type="text"
						placeholder="Article Description"
					/>
					{#if form?.missingArticleDescription}
						<p class="error">Article Description is required</p>
					{/if}
				</label>

				<label>
					Article Author
					<input class="inputField" name="articleAuthor" type="text" placeholder="Article Author" />
				</label>

				<label>
					Published at
					<input class="inputField" name="publishedAt" type="text" placeholder="Published at" />
				</label>
			{/if}
		</section>
		<section>
			<input type="submit" value="Add" />
		</section>
	</div>
</form>

<style lang="postcss">
	form {
		width: 32rem;

		& .error {
			color: red;
		}
	}
	section {
		margin-bottom: 1rem;
	}
</style>
