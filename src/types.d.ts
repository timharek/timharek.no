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
  /** section slug */
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

type Section = {
  pages: Page[] | Post[];
  subSections?: Section[];
} & Page;

type Tag = {
  title: string;
  slug: string;
  path: string;
};
