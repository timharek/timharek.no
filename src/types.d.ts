interface Post {
  title: string;
  date: Date;
  path: string;
  draft?: boolean;
}

interface Section {
  title: string;
  path: string;
}

interface Page {
  title: string;
  path: string;
}
