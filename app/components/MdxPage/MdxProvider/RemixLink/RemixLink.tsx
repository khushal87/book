import React from "react";
import { Link } from "remix";
import useStyles from "./RemixLink.styles";

export default function GatsbyLink(
    props: React.ComponentPropsWithoutRef<typeof Link>
) {
    const { classes } = useStyles();
    return <Link className={classes.link} {...props} />;
}
