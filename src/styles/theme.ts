const colors = {
  darkBlue: `hsl(209, 23%, 22%)`,
  veryDarkBlue1: `hsl(207, 26%, 17%)`,
  veryDarkBlue2: `hsl(200, 15%, 8%)`,
  darkGray: `hsl(0, 0%, 52%)`,
  veryLightGray: `hsl(0, 0%, 98%)`,
  white: `hsl(0, 0%, 100%)`,
}

const baseTheme = {
  baseFontFamily: `'Nunito Sans', sans- serif`,
  baseFontWeight: 600,
  lightFontWeight: 300,
  boldFontWeight: 800,
  boxShadow: `0 0 0 4px rgba(0, 0, 0, 0.05), 0 0 0 8px rgba(0, 0, 0, 0.01)`,
  breakPoint: `650px`,
}

export const darkTheme = {
  ...baseTheme,
  isDarkMode: true,
  elementBackgroundColor: colors.darkBlue,
  baseBackgroundColor: colors.veryDarkBlue1,
  baseTextColor: colors.white,
}

export const lightTheme = {
  ...baseTheme,
  isDarkMode: false,
  elementBackgroundColor: colors.white,
  baseBackgroundColor: colors.veryLightGray,
  baseTextColor: colors.veryDarkBlue2,
}

export type Theme = typeof darkTheme
