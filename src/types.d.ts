interface Post {
  title: string;
  date: Date;
  path: string;
  draft?: boolean;
  description?: string;
  taxonomies?: {
    tags: string[];
  };
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
