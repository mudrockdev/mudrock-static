<script lang="ts">
	import { default as DocsTreeNode } from './DocsTreeNode.svelte';
	import type { TreeNode, FileClickEvent } from './types.js';

	let {
		node,
		parentPath = '',
		onfileclick,
		level = 0
	}: {
		node: TreeNode;
		parentPath?: string;
		onfileclick?: (event: FileClickEvent) => void;
		level?: number;
	} = $props();

	// Compute the full path for this node
	const path = parentPath ? `${parentPath}/${node.name}` : node.name;

	// Track open/closed state for folders (local to this component instance)
	let open = $state(true);

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
	<div class="mb-1">
		<button
			type="button"
			class="flex items-center w-full text-left py-1.5 px-2 rounded-md hover:bg-slate-700/50 transition-colors duration-150 group text-sm"
			style="padding-left: {0.5 + level * 0.75}rem"
			onclick={() => (open = !open)}
			onkeydown={handleKeyDown}
			aria-expanded={open}
			aria-label="Toggle folder {node.name}"
		>
			<svg
				class="w-3.5 h-3.5 mr-2 text-slate-400 group-hover:text-slate-300 transition-transform duration-150 shrink-0 {open
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
			<svg
				class="w-4 h-4 mr-2 text-amber-400 group-hover:text-amber-300 shrink-0"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
			</svg>
			<span class="text-slate-200 group-hover:text-white font-medium truncate">{node.name}</span>
		</button>
		{#if open && node.children}
			<div class="mt-0.5">
				{#each node.children as child (child.name)}
					<DocsTreeNode node={child} parentPath={path} {onfileclick} level={level + 1} />
				{/each}
			</div>
		{/if}
	</div>
{:else if node.type === 'file'}
	<div class="mb-0.5">
		<button
			type="button"
			class="flex items-center w-full text-left py-1.5 px-2 rounded-md hover:bg-slate-700/30 transition-colors duration-150 group text-sm"
			style="padding-left: {0.5 + level * 0.75}rem"
			onclick={handleFileClick}
			onkeydown={handleKeyDown}
			aria-label="Open file {node.name}"
		>
			<div class="w-3.5 h-3.5 mr-2 shrink-0"></div>
			<svg
				class="w-4 h-4 mr-2 text-slate-500 group-hover:text-slate-400 shrink-0"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fill-rule="evenodd"
					d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
					clip-rule="evenodd"
				/>
			</svg>
			<span class="text-slate-300 group-hover:text-white truncate"
				>{node.name.replace('.md', '')}</span
			>
			<svg
				class="w-3 h-3 ml-auto text-slate-600 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fill-rule="evenodd"
					d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
{/if}
