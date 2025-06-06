<script lang="ts">
	import '../app.css';
	import DocsTree from '$lib/DocsTree.svelte';
	import { goto } from '$app/navigation';

	// Import all markdown files from docs directory
	const markdownFiles = import.meta.glob('/src/docs/**/*.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	// Build tree structure from file paths
	const tree = {
		name: 'docs',
		type: 'folder' as const,
		children: Object.keys(markdownFiles).reduce((acc: Array<TreeNode>, path) => {
			const relativePath = path.replace('/src/docs/', '');
			const parts = relativePath.split('/');
			let current = acc;

			parts.forEach((part, index) => {
				const isFile = index === parts.length - 1;
				const existing = current.find((item) => item.name === part);

				if (existing) {
					current = existing.children ?? [];
				} else {
					const newItem: TreeNode = {
						name: part,
						type: isFile ? 'file' : 'folder',
						...(isFile ? {} : { children: [] })
					};
					current.push(newItem);
					current = isFile ? current : newItem.children || [];
				}
			});

			return acc;
		}, [])
	};

	interface TreeNode {
		name: string;
		type: 'file' | 'folder';
		children?: TreeNode[];
	}

	function handleFileClick(event: { path: string }) {
		// Remove the root 'docs/' from the path if it exists
		let filePath = event.path;
		console.log('Original path:', filePath);
		if (filePath.startsWith('docs/')) {
			filePath = filePath.substring(5); // Remove 'docs/' prefix
		}
		console.log('Cleaned path:', filePath);

		// Convert to URL-friendly format, preserving folder structure
		const urlPath = filePath
			.replace('.md', '') // Remove .md extension
			.replace(/\s+/g, '-') // Replace spaces with dashes
			.toLowerCase(); // Convert to lowercase

		console.log('Generated URL path:', urlPath);
		console.log('Final URL:', `/${urlPath}`);
		goto(`/${urlPath}`);
	}

	let { children } = $props();
</script>

<div class="flex min-h-screen bg-slate-900">
	<!-- Sidebar -->
	<aside class="w-56 border-r border-slate-700 py-4 overflow-y-auto bg-slate-800/50">
		<nav class="px-2">
			<DocsTree {tree} onfileclick={handleFileClick} />
		</nav>
	</aside>

	<!-- Content Area -->
	<main class="flex-1 overflow-y-auto">
		<div class="max-w-4xl mx-auto px-8 py-12">
			{@render children()}
		</div>
	</main>
</div>
