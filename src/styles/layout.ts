import { createStyle } from '@/composables/useFela'
import { HeaderProps } from '@/types/ComponentOptions'
import moonOutline from '@/assets/moon-outline.svg'
import moonFilled from '@/assets/moon.svg'

export const layout = {
  wrapper: createStyle(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    color: theme.baseTextColor,
    fontFamily: theme.baseFontFamily,
    backgroundColor: theme.baseBackgroundColor,
  })),
  headerWrapper: createStyle(({ theme }) => ({
    width: '100%',
    height: '80px',
    backgroundColor: theme.elementBackgroundColor,
    boxShadow: `0 1.2px 3.6px rgba(0, 0, 0, 0.024),
      0 3.3px 10px rgba(0, 0, 0, 0.035),
      0 7.8px 24.1px rgba(0, 0, 0, 0.046),
      0 26px 80px rgba(0, 0, 0, 0.07)`,
  })),
  contentWrapper: createStyle(({ theme }) => ({
    flex: 1,
    width: '100%',
    paddingTop: '24px',
    paddingRight: '16px',
    paddingBottom: '24px',
    paddingLeft: '16px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      width: '90vw',
      maxWidth: '1280px',
      paddingTop: '48px',
      paddingRight: 0,
      paddingBottom: '48px',
      paddingLeft: 0,
    },
  })),
  footerWrapper: createStyle(() => ({
    padding: '10px',
    fontSize: '12px',
    textAlign: 'center',
    '> a': {
      color: 'currentColor',
      textDecoration: 'underline',
      ':hover': {
        textDecoration: 'none',
      },
    },
  })),
}

export const appHeader = {
  wrapper: createStyle(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
    margin: '0 auto',
    padding: '12.5px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      width: '90vw',
      maxWidth: '1305px',
    },
  })),
  title: createStyle(({ theme }) => ({
    marginTop: '2px',
    marginLeft: '3.5px',
    fontWeight: theme.boldFontWeight,
    fontSize: '14px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      marginTop: 0,
      marginLeft: '2.5px',
      fontSize: '24px',
    },
  })),
  themeButton: createStyle<HeaderProps>(({ theme, isDarkMode }) => ({
    marginTop: '2px',
    padding: '4px',
    paddingLeft: 'calc(1em + 12px)',
    color: 'inherit',
    fontFamily: theme.baseFontFamily,
    fontSize: '12px',
    fontWeight: theme.baseFontWeight,
    background: 'none',
    backgroundImage: `url(${isDarkMode ? moonFilled : moonOutline})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1em',
    backgroundPosition: 0,
    border: 'none',
    cursor: 'pointer',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      marginTop: 0,
      marginRight: '-3px',
      fontSize: '16px',
    },
  })),
}
