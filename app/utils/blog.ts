import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

export type Blog = {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    order: number;
};

export type PostMarkdownAttributes = {
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
    slug: string;
    order: number;
};

const blogsPath = path.join(__dirname, "..", "content", "blog");

function isValidPostAttributes(
    attributes: any
): attributes is PostMarkdownAttributes {
    return attributes?.title;
}

function sortPages(pages: Blog[]) {
    const clone = [...pages];
    clone.sort((a, b) => {
        if ("order" in a && "order" in b) {
            if (a.order === b.order) {
                return a.title
                    .toLowerCase()
                    .localeCompare(b.title.toLowerCase());
            }

            return a.order - b.order;
        }

        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });

    return clone;
}

export const getBlogs = async () => {
    const dirs = await fs.readdir(blogsPath);
    const filesMain: Record<string, Blog[]> = {};
    const data = await Promise.all(
        dirs.map(async (dir) => {
            const files = await fs.readdir(path.join(blogsPath, dir));
            const data = await Promise.all(
                files.map(async (filename) => {
                    const file = await fs.readFile(
                        path.join(blogsPath, dir, filename),
                        "utf8"
                    );
                    const { attributes } = parseFrontMatter(file.toString());
                    invariant(
                        isValidPostAttributes(attributes),
                        `${filename} has bad meta data!`
                    );
                    return {
                        slug: attributes.slug,
                        description: attributes.description,
                        title: attributes.title,
                        date: attributes.date,
                        category: attributes.category,
                        tags: attributes.tags,
                        order: attributes.order,
                    };
                })
            );
            return { dir, data };
        })
    );
    data.map((item) => {
        filesMain[item.dir] = item.data;
    });

    return filesMain;
};

export type URLParams = {
    main: string;
    slug: string;
};

export const getBlog = async (params: URLParams) => {
    const filepath = path.join(blogsPath, `${params.main}`, `${params.slug}`);
    const file = await fs.readFile(filepath, "utf8");
    const { attributes, body } = parseFrontMatter(file.toString());
    invariant(
        isValidPostAttributes(attributes),
        `Post ${params.main}/${params.slug} has missing attributes!`
    );
    marked.setOptions({
        highlight: (code, lang) => {
            if (lang === "jsx") {
            }
            return code;
        },
    });
    const html = marked(body);
    return {
        html,
        main: params.main,
        slug: params.slug,
        title: attributes.title,
        description: attributes.description,
        date: attributes.date,
    };
};
