import React, { useState, useRef } from "react";
import { Link } from "remix";
import { ChevronDownIcon } from "@modulz/radix-icons";
import { Text } from "@mantine/core";
import { useLocation } from "@reach/router";
import { Blog, getBlogs } from "../../../../utils/blog";
import useStyles from "./NavbarDocsCategory.styles";

interface NavbarDocsCategoryProps {
    group: string;
    data: Blog[];
    onLinkClick(): void;
}

export default function NavbarDocsCategory({
    group,
    data,
    onLinkClick,
}: NavbarDocsCategoryProps) {
    const { classes, cx } = useStyles();
    const [collapsed, setCollapsed] = useState(group === "changelog");
    const activeCoreItemRef = useRef(null);
    // const location = useLocation();

    React.useEffect(() => {
        if (activeCoreItemRef.current) {
            // @ts-ignore
            activeCoreItemRef.current.scrollIntoView({
                block: "center",
            });
        }
    }, [activeCoreItemRef.current]);

    // const uncategorized = (
    //     group.group === "changelog"
    //         ? [...group.uncategorized].reverse()
    //         : group.uncategorized
    // ).map((link) => (
    //     <Link
    //         key={link.slug}
    //         className={classes.link}
    //         to={link.slug}
    //         onClick={onLinkClick}
    //     >
    //         {link.title}
    //     </Link>
    // ));

    const categorized = data.map((link) => (
        // <div className={classes.innerCategory} key={link.title}>
        <Link
            key={link.slug}
            className={classes.link}
            to={"blogs" + link.slug}
            onClick={onLinkClick}
            //   ref={
            //       location.pathname === link.slug
            //           ? activeCoreItemRef
            //           : null
            //   }
        >
            {link.title}
        </Link>
        // </div>
    ));

    return (
        <div
            className={cx(classes.category, {
                [classes.categoryCollapsed]: collapsed,
            })}
        >
            <button
                className={classes.header}
                type="button"
                onClick={() => setCollapsed((c) => !c)}
            >
                <ChevronDownIcon
                    className={cx(classes.icon, {
                        [classes.iconCollapsed]: collapsed,
                    })}
                />
                <Text
                    className={classes.title}
                    weight={700}
                    size="xs"
                    transform="uppercase"
                >
                    {group}
                </Text>
            </button>
            {/* {!collapsed && uncategorized} */}
            {!collapsed && categorized}
        </div>
    );
}
