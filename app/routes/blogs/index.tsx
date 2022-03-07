import { Link, useLoaderData, LinksFunction } from "remix";
import { getBlogs, Blog } from "../../utils/blog";
import stylesUrl from "~/styles/blogs/index.css";
import dayjs from "dayjs";

export let loader = () => {
    return getBlogs();
};

export let links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

const compare = (a: Blog, b: Blog) => {
    const date1 = new Date(b.date).getTime();
    const date2 = new Date(a.date).getTime();
    return date1 - date2;
};

export default function Posts() {
    let blogs = useLoaderData<Blog[]>();
    return (
        <div>
            <h1 className="blogs__heading">Blogs</h1>
            {blogs.sort(compare).map((blog: Blog) => {
                return (
                    <li className="individual__blog" key={blog.slug}>
                        <Link className="heading" to={blog.slug}>
                            {blog.title}
                        </Link>
                        <p className="date">
                            {dayjs(blog.date).format("D MMM, YYYY")}
                        </p>
                        {blog.tags.map((item, index) => {
                            if (index < blog.tags.length - 1) {
                                return (
                                    <span key={item}>
                                        <Link to={`/blogs/${item}`}>
                                            #{item.toLowerCase()}
                                        </Link>
                                        {", "}
                                    </span>
                                );
                            } else {
                                return (
                                    <Link key={item} to={`/blogs/${item}`}>
                                        #{item.toLowerCase()}
                                    </Link>
                                );
                            }
                        })}
                    </li>
                );
            })}
        </div>
    );
}
