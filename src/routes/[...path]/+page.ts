import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	// Import all markdown files to get their paths
	const markdownFiles = import.meta.glob('/src/docs/**/*.md');

	const entries: Array<{ path: string }> = [];

	// Convert file paths to URL paths
	for (const filePath of Object.keys(markdownFiles)) {
		// Remove '/src/docs/' prefix and '.md' suffix
		const relativePath = filePath.replace('/src/docs/', '').replace('.md', '');

		// Convert spaces to hyphens and make lowercase for URL compatibility
		const urlPath = relativePath.replace(/\s+/g, '-').toLowerCase();

		entries.push({ path: urlPath });
	}

	return entries;
};
