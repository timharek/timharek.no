interface Attrs {
  title: string;
  description?: string;
  draft?: boolean;
}

interface PageAttrs extends Attrs {
  updated?: string;
}

interface PostAttrs extends Attrs {
  updated?: string;
  taxonomies?: {
    tags: string[];
  };
}

interface Page {
  title: string;
  slug: string;
  path: string;
  /** Markdown */
  content: string;
  wordCount: number;
  readingTime: number;
  description?: string;
  updated?: Date;
  draft?: boolean;
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
  pages: Page[] | Post[];
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
