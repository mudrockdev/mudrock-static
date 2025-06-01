<script lang="ts">
	interface TreeNode {
		name: string;
		type: "folder" | "file";
		children?: TreeNode[];
	}

	import DocsTreeNode from './DocsTreeNode.svelte';

	let { tree, onfileclick }: { tree: TreeNode; onfileclick?: (event: { path: string }) => void } = $props();

	function handleFileClick(event: { path: string }) {
		onfileclick?.(event);
	}
</script>

{#if tree}
	<DocsTreeNode node={tree} parentPath="" onfileclick={handleFileClick} />
{/if}
