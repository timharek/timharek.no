interface Post {
  title: string;
  date: Date;
  updated?: Date;
  path: string;
  draft?: boolean;
  description?: string;
  taxonomies?: {
    tags: string[];
  };
  content: string;
}

interface Section {
  title: string;
  path: string;
}

interface Page {
  title: string;
  path: string;
  description?: string;
}

interface Tag {
  title: string;
  slug: string;
  path: string;
}
