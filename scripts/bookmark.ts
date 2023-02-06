import { listBookmarks } from 'https://deno.land/x/linkding@v1.0.1/mod.ts';
import 'https://deno.land/std@0.176.0/dotenv/load.ts';

const allBookmarks = await listBookmarks({ all: true });

const outputPath = '../static/api/bookmarks.json';

try {
  await Deno.writeTextFile(outputPath, JSON.stringify(allBookmarks, null, 2));

  console.log(`Added ${allBookmarks.length} to bookmarks.json`);
} catch (error) {
  console.error('Failed to write bookmarks to JSON-file');
  console.error(error);
}
