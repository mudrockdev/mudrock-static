export interface TreeNode {
	name: string;
	type: 'folder' | 'file';
	children?: TreeNode[];
}

export interface Frontmatter {
	title?: string;
	description?: string;
	author?: string;
	date?: string;
	[key: string]: string | undefined;
}

export interface FileClickEvent {
	path: string;
}

export interface MarkdownModule {
	default: never;
}
