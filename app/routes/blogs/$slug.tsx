import { useLoaderData, LoaderFunction } from "remix";
import { getBlog } from "../../utils/blog";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "expected params.slug");
    // return getBlog(params.slug);
    return { html: "<html><h1>hey there</h1></html>" };
};

export default function Blog() {
    const blog = useLoaderData();
    return (
        <div>
            <h1>{blog.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: blog.html }} />
        </div>
    );
}
