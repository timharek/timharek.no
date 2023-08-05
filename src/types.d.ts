interface Page {
  title: string;
  slug: string;
  path: string;
  /** Markdown */
  content: string;
  description?: string;
  updated?: string;
  draft?: string;
}

interface Post extends Page {
  date: Date;
  taxonomies?: {
    tags: string[];
  };
}

interface Section {
  title: string;
  path: string;
}

interface Tag {
  title: string;
  slug: string;
  path: string;
}
