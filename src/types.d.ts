interface Page {
  title: string;
  slug: string;
  path: string;
  /** Markdown */
  content: string;
  description?: string;
  updated?: Date;
  draft?: string;
  /** title */
  section?: string;
}

interface Post extends Page {
  date: Date;
  taxonomies?: {
    tags: string[];
  };
}

type Section = Page & {
  extra: {
    updated: Date;
  };
  pages: Page[];
};

interface Tag {
  title: string;
  slug: string;
  path: string;
}

interface Redirect {
  [key: string]: string;
}
