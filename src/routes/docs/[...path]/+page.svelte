<script lang="ts">
	import { page } from '$app/stores';
	import { untrack } from 'svelte';

	// Import all markdown files as mdsvex components
	const markdownFiles = import.meta.glob('/src/docs/**/*.md');

	// Import raw markdown for frontmatter parsing
	const rawMarkdownFiles = import.meta.glob('/src/docs/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	// Get current path and find corresponding markdown file
	let pathParam = $derived($page.params.path);

	let MarkdownComponent: any = $state(null);
	let loading = $state(false);
	let error = $state(false);
	let frontmatter: any = $state({});
	let fileName = $derived(pathParam ? pathParam.split('/').pop()?.replace(/-/g, ' ') : '');

	// Parse frontmatter from markdown content
	function parseFrontmatter(markdown: string) {
		const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
		const match = markdown.match(frontmatterRegex);

		if (!match) return {};

		const yamlContent = match[1];
		const parsed: any = {};

		// Simple YAML parser for basic key-value pairs
		yamlContent.split('\n').forEach((line) => {
			const colonIndex = line.indexOf(':');
			if (colonIndex > 0) {
				const key = line.substring(0, colonIndex).trim();
				const value = line.substring(colonIndex + 1).trim();
				parsed[key] = value;
			}
		});

		return parsed;
	}

	async function loadMarkdownComponent(urlPath: string) {
		loading = true;
		error = false;
		MarkdownComponent = null;
		frontmatter = {};

		// Find the matching file path
		const matchingPath = findMarkdownFilePath(urlPath);

		if (matchingPath && markdownFiles[matchingPath]) {
			try {
				const module = await markdownFiles[matchingPath]();
				MarkdownComponent = module.default;

				// Parse frontmatter from raw content
				const rawContent = rawMarkdownFiles[matchingPath];
				if (rawContent) {
					frontmatter = parseFrontmatter(rawContent);
				}
			} catch (e) {
				console.error('Error loading markdown component:', e);
				error = true;
			}
		} else {
			error = true;
		}

		loading = false;
	}

	// Add IDs to headings and handle anchor navigation
	$effect(() => {
		if (MarkdownComponent) {
			untrack(() => {
				// Add IDs to all headings
				const headings = document.querySelectorAll(
					'article h1, article h2, article h3, article h4, article h5, article h6'
				);

				headings.forEach((heading) => {
					if (!heading.id) {
						const text = heading.textContent || '';
						const id = text
							.toLowerCase()
							.replace(/[^a-z0-9\s-]/g, '') // Allow hyphens
							.replace(/\s+/g, '-')
							.replace(/-+/g, '-') // Replace multiple hyphens with single
							.replace(/^-|-$/g, '') // Remove leading/trailing hyphens
							.trim();
						if (id) {
							heading.id = id;
						}
					}
				});

				// Handle hash navigation if present
				if (window.location.hash) {
					const element = document.getElementById(window.location.hash.slice(1));
					if (element) {
						setTimeout(() => {
							element.scrollIntoView({ behavior: 'smooth' });
						}, 100);
					}
				}
			});
		}
	});

	// Load markdown component when path changes
	$effect(() => {
		if (pathParam) {
			loadMarkdownComponent(pathParam);
		}
	});

	function findMarkdownFilePath(urlPath: string): string | null {
		// Try to find the file by matching the URL path to file paths
		for (const filePath of Object.keys(markdownFiles)) {
			// Convert file path to URL format
			const relativePath = filePath.replace('/src/docs/', '');
			const fileUrlPath = relativePath.replace('.md', '').replace(/\s+/g, '-').toLowerCase();

			if (fileUrlPath === urlPath) {
				return filePath;
			}
		}

		return null;
	}
</script>

<svelte:head>
	<title
		>{frontmatter.title || fileName || (pathParam ? `${pathParam} - Documentation` : 'Documentation')}</title
	>
	{#if frontmatter.description}
		<meta name="description" content={frontmatter.description} />
	{/if}
	{#if frontmatter.author}
		<meta name="author" content={frontmatter.author} />
	{/if}
</svelte:head>

{#if loading}
	<div class="text-center text-slate-400 mt-20">
		<p>Loading document...</p>
	</div>
{:else if MarkdownComponent}
	{#if frontmatter.title || fileName || frontmatter.description || frontmatter.author || frontmatter.date}
		<div class="mb-8 pb-6 border-b border-slate-700">
			{#if frontmatter.title || fileName}
				<h1 class="text-3xl font-bold text-slate-100 mb-2">{frontmatter.title || fileName}</h1>
			{/if}
			{#if frontmatter.description}
				<p class="text-lg text-slate-300 mb-4">{frontmatter.description}</p>
			{/if}
			<div class="flex gap-4 text-sm text-slate-400">
				{#if frontmatter.author}
					<span>By {frontmatter.author}</span>
				{/if}
				{#if frontmatter.date}
					<span>•</span>
					<span>{frontmatter.date}</span>
				{/if}
			</div>
		</div>
	{/if}
	<article class="prose prose-invert max-w-none prose-headings:scroll-mt-20 text-slate-100">
		<MarkdownComponent />
	</article>
{:else if error}
	<div class="text-center text-slate-400 mt-20">
		<h1 class="text-2xl font-bold text-slate-100 mb-4">Document not found</h1>
		<p>The document "{pathParam}" could not be found.</p>
		<a href="/docs" class="text-blue-400 hover:text-blue-300 mt-4 inline-block">
			← Back to documentation
		</a>
	</div>
{/if}
