import React from "react";
import { ScrollArea } from "@mantine/core";
import NavbarMainLink from "./NavbarMainLink/NavbarMainLink";
import NavbarDocsCategory from "./NavbarDocsCategory/NavbarDocsCategory";
import { Blog, getBlogs } from "../../../utils/blog";
import mainLinks from "./main-links";
import useStyles from "./Navbar.styles";

interface NavbarProps {
    data: Record<string, Blog[]>;
    opened: boolean;
    onClose(): void;
}

export default function Navbar({ data, opened, onClose }: NavbarProps) {
    const { classes, cx } = useStyles();

    const main = mainLinks.map((item) => (
        <NavbarMainLink
            key={item.to}
            to={item.to}
            color={item.theme}
            icon={<item.icon style={{ height: 18, width: 18 }} />}
            onClick={onClose}
        >
            {item.label}
        </NavbarMainLink>
    ));

    const docs = Object.keys(data).map((key) => {
        return (
            <NavbarDocsCategory
                group={key}
                data={data[key]}
                key={key}
                onLinkClick={onClose}
            />
        );
    });
    // const docs =
    // <NavbarDocsCategory
    //     group={blog.category}
    //     key={blog.title}
    //     onLinkClick={onClose}
    // />

    return (
        <nav className={cx(classes.navbar, { [classes.opened]: opened })}>
            <ScrollArea style={{ height: "100vh" }} type="scroll">
                <div className={classes.body}>
                    {main}
                    <div className={classes.docs}>{docs}</div>
                </div>
            </ScrollArea>
        </nav>
    );
}
