interface Page {
  title: string;
  slug: string;
  path: string;
  /** Markdown */
  content: string;
  wordCount: number;
  description?: string;
  updated?: Date;
  draft?: string;
  /** title */
  section?: string;
  extra?: Record<string, string | string[]>;
}

interface Post extends Page {
  date: Date;
  taxonomies?: {
    tags: string[];
  };
}

type Section = Page & {
  pages: Page[];
  extra?: {
    updated: Date;
  };
  subSections?: Section[];
};

interface Tag {
  title: string;
  slug: string;
  path: string;
}

interface Redirect {
  [key: string]: string;
}
