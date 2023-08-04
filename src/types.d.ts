interface Post {
  title: string;
  date: Date;
  path: string;
  draft?: boolean;
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
}

interface Tag {
  title: string;
  slug: string;
  path: string;
}
