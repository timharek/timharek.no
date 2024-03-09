type SectionProp = "main" | string;

type Page = {
  title: string;
  slug: string;
  path: string;
  html: string;
  wordCount: number;
  readingTime: number;
  description?: string;
  language?: string;
  updatedAt?: Date;
  draft?: boolean;
  /** title */
  section: SectionProp;
  links?: {
    external?: string[];
    internal?: string[];
  };
};

type Post = {
  createdAt: Date;
  tags: Tag[];
} & Page;

// TODO: `section` shouldn't actually be omitted. It's useful to see parents etc.
type Section = Omit<Page, "section"> & {
  pages: Page[] | Post[];
  subSections?: Section[];
};

type Tag = {
  title: string;
  slug: string;
  path: string;
};
