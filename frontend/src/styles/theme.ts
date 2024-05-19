'use client'
import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material'
import { colors } from './colors'

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const theme = createTheme({
  palette: {
    background: { default: colors.white },
    primary: { main: colors.blueDark },
    secondary: { main: colors.blueLight },
    text: { primary: colors.blue },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme
