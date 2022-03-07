import { Blog } from "../utils/blog";

export interface MdxPageProps {
    html: string;
    frontmatter: Partial<Blog>;
}
