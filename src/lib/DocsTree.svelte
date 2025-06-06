<script lang="ts">
	import DocsTreeNode from './DocsTreeNode.svelte';
	import type { TreeNode, FileClickEvent } from './types.js';

	let {
		tree,
		onfileclick,
		level = 0,
		searchQuery = ''
	}: {
		tree: TreeNode;
		onfileclick?: (event: FileClickEvent) => void;
		level?: number;
		searchQuery?: string;
	} = $props();

	function handleFileClick(event: FileClickEvent) {
		onfileclick?.(event);
	}
</script>

{#if tree}
	<DocsTreeNode node={tree} parentPath="" onfileclick={handleFileClick} {level} {searchQuery} />
{/if}
