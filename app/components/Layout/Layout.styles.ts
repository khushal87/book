import { createStyles } from "@mantine/core";
import { HEADER_HEIGHT } from "./Header/Header.styles";

export const NAVBAR_WIDTH = 260;
export const NAVBAR_BREAKPOINT = 760;

interface LayoutStyles {
    shouldRenderHeader: boolean;
}

export default createStyles((theme, { shouldRenderHeader }: LayoutStyles) => ({
    "@global": {
        "#nprogress": {
            zIndex: 100000,
        },

        ":target": {
            display: "block",
            position: "relative",
            top: HEADER_HEIGHT * -1 - 10,
            visibility: "hidden",
        },
    },

    withNavbar: {
        paddingLeft: NAVBAR_WIDTH,

        [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
            paddingLeft: 0,
        },
    },

    withoutHeader: {
        "& $main": {
            paddingTop: 0,
        },
    },

    main: {
        scrollMarginTop: HEADER_HEIGHT,
        flex: 1,
        // aligns page top most heading with navigation and table of contents
        paddingTop: shouldRenderHeader
            ? HEADER_HEIGHT + theme.spacing.xl + 2
            : 0,
        paddingLeft: shouldRenderHeader
            ? HEADER_HEIGHT + theme.spacing.xl + 2
            : 0,

        [`@media (max-width: ${NAVBAR_BREAKPOINT}px)`]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },

    content: {
        minHeight: "calc(100vh - 280px)",
    },
}));
