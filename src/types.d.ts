type SectionProp = "main" | string;

interface Page {
  title: string;
  slug: string;
  path: string;
  html: string;
  wordCount: number;
  readingTime: number;
  description?: string;
  language?: string;
  updated?: Date;
  draft?: boolean;
  /** title */
  section: SectionProp;
  links?: {
    external?: string[];
    internal?: string[];
  };
}

interface Post extends Page {
  createdAt: Date;
  tags: Tag[];
}

// TODO: `section` shouldn't actually be omitted. It's useful to see parents etc.
type Section = Omit<Page, "section"> & {
  pages: Page[] | Post[];
  subSections?: Section[];
};

interface Tag {
  title: string;
  slug: string;
  path: string;
}

type Redirect = Record<string, string>;
