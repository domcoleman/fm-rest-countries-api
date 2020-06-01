import { createStyle } from '@/composables/useFela'

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
    padding: '24px 16px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      width: '90vw',
      maxWidth: '1280px',
      padding: '48px 0',
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
