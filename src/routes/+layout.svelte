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

	// Build tree structure from file paths - start with contents of docs folder
	const treeChildren = Object.keys(markdownFiles).reduce((acc: Array<TreeNode>, path) => {
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
	}, []);

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

	// Search functionality
	let searchQuery = $state('');

	let filteredTreeChildren: TreeNode[] = $state([]);

	$effect(() => {
		if (!searchQuery.trim()) {
			filteredTreeChildren = treeChildren;
			return;
		}

		const query = searchQuery.toLowerCase().trim();

		function filterNode(
			node: TreeNode,
			depth: number = 0,
			visited = new Set<string>()
		): TreeNode | null {
			// Prevent infinite recursion with visited tracking
			const nodeKey = `${depth}-${node.name}-${node.type}`;
			if (depth > 10 || visited.has(nodeKey)) {
				return null;
			}
			visited.add(nodeKey);

			try {
				// For files, check if filename (without .md) matches
				if (node.type === 'file') {
					const fileName = node.name.replace('.md', '');
					return fileName.toLowerCase().includes(query) ? node : null;
				}

				// For folders, check folder name AND recursively check all children
				const folderNameMatches = node.name.toLowerCase().includes(query);

				let matchingChildren: TreeNode[] = [];
				if (node.children && node.children.length > 0) {
					matchingChildren = node.children
						.map((child) => filterNode(child, depth + 1, new Set(visited)))
						.filter((child): child is TreeNode => child !== null);
				}

				// Include folder if name matches OR has matching children
				if (folderNameMatches || matchingChildren.length > 0) {
					return {
						...node,
						children: matchingChildren
					} as TreeNode;
				}

				return null;
			} catch (error) {
				console.error('Error filtering node:', node.name, error);
				return null;
			}
		}

		try {
			const result = treeChildren
				.map((child) => filterNode(child))
				.filter((child): child is TreeNode => child !== null);

			filteredTreeChildren = result;
		} catch (error) {
			console.error('Error in search filter:', error);
			filteredTreeChildren = [];
		}
	});
</script>

<div class="flex min-h-screen bg-slate-900">
	<!-- Sidebar -->
	<aside
		class="w-64 border-r border-slate-700/60 py-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm"
	>
		<nav class="px-3">
			<div class="mb-4">
				<h2 class="text-xs uppercase tracking-wider text-slate-400 font-semibold px-2 mb-3">
					Documentation
				</h2>

				<div class="relative">
					<svg
						class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						placeholder="Search docs..."
						bind:value={searchQuery}
						class="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-md text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-150"
					/>
					{#if searchQuery}
						<button
							type="button"
							onclick={() => (searchQuery = '')}
							class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-150"
							aria-label="Clear search"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					{/if}
				</div>
			</div>
			{#if filteredTreeChildren.length > 0}
				{#each filteredTreeChildren as child (child.name)}
					<DocsTree tree={child} onfileclick={handleFileClick} level={0} {searchQuery} />
				{/each}
			{:else if searchQuery.trim()}
				<div class="px-2 py-4 text-center text-slate-500 text-sm">
					No results found for "{searchQuery}"
				</div>
			{:else}
				{#each treeChildren as child (child.name)}
					<DocsTree tree={child} onfileclick={handleFileClick} level={0} />
				{/each}
			{/if}
		</nav>
	</aside>

	<!-- Content Area -->
	<main class="flex-1 overflow-y-auto">
		<div class="max-w-4xl mx-auto px-8 py-12">
			{@render children()}
		</div>
	</main>
</div>
