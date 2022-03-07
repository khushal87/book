import React from "react";
import { Footer } from "./Footer/Footer";
import Header from "./Header/Header";
import Navbar from "./SideNavbar/Navbar";
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { useHotkeys, useLocalStorageValue } from "@mantine/hooks";
import MdxProvider from "../MdxPage/MdxProvider/MdxProvider";
import useStyles from "./Layout.styles";
import { Blog } from "~/utils/blog";
import "../../fonts/GreycliffCF/styles.css";

type LayoutProps = {
    data: Blog[];
};

export default function Layout({
    data,
    children,
}: React.PropsWithChildren<{}> & LayoutProps) {
    const [navbarOpened, setNavbarState] = React.useState(false);
    const { classes, cx } = useStyles({ shouldRenderHeader: true });

    const THEME_KEY = "mantine-color-scheme";

    const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
        key: THEME_KEY,
        defaultValue: "light",
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    useHotkeys([["mod+J", () => toggleColorScheme()]]);

    return (
        <div className="remix-app">
            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme,
                        headings: { fontFamily: "Greycliff CF, sans serif" },
                    }}
                >
                    <div
                        className={cx({
                            [classes.withNavbar]: true,
                            [classes.withoutHeader]: true,
                        })}
                    >
                        <Header
                            navbarOpened={navbarOpened}
                            toggleNavbar={() => setNavbarState((o) => !o)}
                        />

                        <Navbar
                            data={data}
                            opened={navbarOpened}
                            onClose={() => setNavbarState(false)}
                        />
                        <main className={classes.main}>
                            <div className={classes.content}>
                                <ModalsProvider
                                    labels={{
                                        confirm: "Confirm",
                                        cancel: "Cancel",
                                    }}
                                    // modals={{ demonstration: demonstrationModal }}
                                >
                                    <NotificationsProvider>
                                        <MdxProvider>{children}</MdxProvider>
                                    </NotificationsProvider>
                                </ModalsProvider>
                            </div>
                        </main>
                    </div>
                    {/* <Footer /> */}
                </MantineProvider>
            </ColorSchemeProvider>
        </div>
    );
}
