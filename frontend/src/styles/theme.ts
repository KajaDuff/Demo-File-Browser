"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";
import { colors } from "./colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    background: { default: colors.white },
    primary: { main: colors.blueDark },
    secondary: { main: colors.blueLight },
    text: { primary: colors.blue },
  },
});

export default theme;
