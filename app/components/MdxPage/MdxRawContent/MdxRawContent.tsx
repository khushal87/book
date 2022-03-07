import React from "react";
import TableOfContents from "../TableOfContents/TableOfContents";
import { MdxPageBase } from "../MdxPageBase/MdxPageBase";
import { MdxSiblings } from "../MdxSiblings/MdxSiblings";
import { MdxPageProps } from "../../../types";
import useStyles from "./MdxRawContent.styles";

export function MdxRawContent({ html }: MdxPageProps) {
    const { classes } = useStyles();
    return (
        <MdxPageBase>
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    {/* <MdxSiblings siblings={siblings} /> */}
                </div>

                {/* <div className={classes.tableOfContents}>
                    <TableOfContents headings={headings} withTabs={false} />
                </div> */}
            </div>
        </MdxPageBase>
    );
}
