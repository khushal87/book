import { useLoaderData, LoaderFunction } from "remix";
import { getBlog, URLParams } from "../../utils/blog";
import invariant from "tiny-invariant";
import Head from "../../components/Head/Head";
import { MdxPage } from "~/components/MdxPage/MdxPage";

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "expected params.slug");
    return getBlog(params as URLParams);
};

export default function Blog() {
    const blog = useLoaderData();
    return (
        <article>
            <Head title={blog.title} description={blog.title} />
            <MdxPage
                html={blog.html}
                frontmatter={{
                    title: blog.title,
                    description: blog.description,
                }}
            />
        </article>
    );
}
