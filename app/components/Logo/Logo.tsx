import React from "react";
import { Link } from "remix";
import { LogoImage } from "./LogoImage";
import useStyles from "./Logo.styles";

export function Logo() {
    const { classes } = useStyles();

    return (
        <Link to="/" className={classes.logo} aria-label="Mantine">
            <LogoImage className={classes.image} />
        </Link>
    );
}
