<script lang="ts">
	import { default as DocsTreeNode } from './DocsTreeNode.svelte';
	import type { TreeNode, FileClickEvent } from './types.js';

	let {
		node,
		parentPath = '',
		onfileclick
	}: {
		node: TreeNode;
		parentPath?: string;
		onfileclick?: (event: FileClickEvent) => void;
	} = $props();

	// Compute the full path for this node
	const path = parentPath ? `${parentPath}/${node.name}` : node.name;

	// Track open/closed state for folders (local to this component instance)
	let open = $state(false);

	// Event dispatcher for file clicks

	function handleFileClick() {
		console.log('File clicked:', path);
		onfileclick?.({ path });
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (node.type === 'folder') {
				console.log('Folder toggled:', path);
				open = !open;
			} else {
				handleFileClick();
			}
		}
	}
</script>

{#if node.type === 'folder'}
	<div class="group mb-1">
		<button
			type="button"
			class="flex items-center w-full text-left cursor-pointer select-none py-2 px-3 rounded-lg hover:bg-slate-800/80 transition-all duration-200 hover:shadow-sm group"
			onclick={() => (open = !open)}
			onkeydown={handleKeyDown}
			aria-expanded={open}
			aria-label="Toggle folder {node.name}"
		>
			<div class="flex items-center justify-center w-5 h-5 mr-3">
				<svg
					class="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform duration-200 {open
						? 'rotate-90'
						: ''}"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="flex items-center">
				<svg
					class="w-4 h-4 mr-2 text-blue-400 group-hover:text-blue-300"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
				</svg>
				<span class="font-medium text-slate-300 group-hover:text-slate-100 text-sm"
					>{node.name}</span
				>
			</div>
		</button>
		{#if open && node.children}
			<div
				class="ml-6 pl-3 border-l border-slate-700/50 space-y-0.5"
				role="group"
				aria-label="Folder contents"
			>
				{#each node.children as child (child.name)}
					<DocsTreeNode node={child} parentPath={path} {onfileclick} />
				{/each}
			</div>
		{/if}
	</div>
{:else if node.type === 'file'}
	<div class="group mb-0.5">
		<button
			type="button"
			class="flex items-center w-full text-left py-2 px-3 cursor-pointer hover:bg-slate-800/60 rounded-lg text-slate-400 hover:text-slate-100 text-sm transition-all duration-200 hover:shadow-sm group"
			onclick={handleFileClick}
			onkeydown={handleKeyDown}
			aria-label="Open file {node.name}"
		>
			<div class="flex items-center justify-center w-5 h-5 mr-3">
				<svg
					class="w-4 h-4 text-slate-500 group-hover:text-slate-300"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fill-rule="evenodd"
						d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<span class="truncate text-slate-100">{node.name.replace('.md', '')}</span>
			<div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
				<svg class="w-3 h-3 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</button>
	</div>
{/if}
