import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    // interface BreakpointOverrides {
    //     xs: false; // removes the `xs` breakpoint
    //     sm: false;
    //     md: false;
    //     lg: false;
    //     xl: false;
    //     mobile: true; // adds the `mobile` breakpoint
    //     tablet: true;
    //     laptop: true;
    //     desktop: true;
    // }
}

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "rgba(30,30,30,1)",
            paper: "rgba(0,0,0,0.95)",
        },
    },
    // breakpoints: {
    //     values: {
    //         mobile: 0,
    //         tablet: 640,
    //         laptop: 1024,
    //         desktop: 1200,
    //     },
    // },
    typography: {
        fontSize: 14,
        h1: {
            fontSize: 56,
            textAlign: "center",
            padding: 8,
            "@media (max-width:600px)": { fontSize: 36, padding: 4 },
        },
        h2: {
            fontSize: 48,
            textAlign: "center",
            padding: 4,
            "@media (max-width:600px)": { fontSize: 32, padding: 2 },
        },
        h3: {
            fontSize: 36,
            textAlign: "center",
            padding: 4,
            "@media (max-width:600px)": { fontSize: 28, padding: 2 },
        },
        h4: {
            fontSize: 28,
            textAlign: "center",
            padding: 4,
            "@media (max-width:600px)": { fontSize: 22, padding: 2 },
        },
        subtitle1: { fontStyle: "italic" },
        subtitle2: { fontStyle: "italic", color: "#ccc" },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "rgba(233,233,233,1)",
            paper: "rgba(255,255,255,0.95)",
        },
    },
    // breakpoints: {
    //     values: {
    //         mobile: 0,
    //         tablet: 640,
    //         laptop: 1024,
    //         desktop: 1200,
    //     },
    // },
    typography: {
        fontSize: 14,
        h1: {
            fontSize: 56,
            textAlign: "center",
            padding: 8,
            "@media (max-width:600px)": { fontSize: 36, padding: 4 },
        },
        h2: {
            fontSize: 48,
            textAlign: "center",
            padding: 4,
            "@media (max-width:600px)": { fontSize: 32, padding: 2 },
        },
        h3: {
            fontSize: 36,
            textAlign: "center",
            padding: 4,
            "@media (max-width:600px)": { fontSize: 28, padding: 2 },
        },
        h4: {
            fontSize: 28,
            textAlign: "center",
            padding: 4,
            "@media (max-width:600px)": { fontSize: 22, padding: 2 },
        },
        subtitle1: { fontStyle: "italic" },
        subtitle2: { fontStyle: "italic", color: "#555" },
    },
});
