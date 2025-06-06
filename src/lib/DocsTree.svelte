<script lang="ts">
	import DocsTreeNode from './DocsTreeNode.svelte';
	import type { TreeNode, FileClickEvent } from './types.js';

	let {
		tree,
		onfileclick,
		level = 0
	}: { tree: TreeNode; onfileclick?: (event: FileClickEvent) => void; level?: number } = $props();

	function handleFileClick(event: FileClickEvent) {
		onfileclick?.(event);
	}
</script>

{#if tree}
	<DocsTreeNode node={tree} parentPath="" onfileclick={handleFileClick} {level} />
{/if}
