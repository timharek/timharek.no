interface Page {
  title: string;
  slug: string;
  path: string;
  /** Markdown */
  content: string;
  description?: string;
  updated?: Date;
  draft?: string;
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
};

interface Tag {
  title: string;
  slug: string;
  path: string;
}

interface Redirect {
  [key: string]: string;
}
