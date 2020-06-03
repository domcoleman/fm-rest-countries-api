import { createStyle, combineRules } from '@/composables/useFela'
import backArrowLight from '@/assets/back-light.svg'
import backArrowDark from '@/assets/back-dark.svg'

export const pillButton = createStyle(({ theme }) => ({
  display: 'inline-block',
  paddingTop: '7px',
  paddingRight: '22px',
  paddingBottom: '7px',
  paddingLeft: '22px',
  color: theme.baseTextColor,
  fontFamily: theme.baseFontFamily,
  fontWeight: theme.lightFontWeight,
  fontSize: '14px',
  backgroundColor: theme.elementBackgroundColor,
  border: 'none',
  borderRadius: '2px',
  boxShadow: theme.boxShadow,
  cursor: 'pointer',
}))

const backButton = createStyle(({ theme }) => ({
  paddingLeft: '50px',
  backgroundImage: `url(${theme.isDarkMode ? backArrowDark : backArrowLight})`,
  backgroundPositionX: '20px',
  backgroundPositionY: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.5em',
  [`@media screen and (min-width: ${theme.breakPoint})`]: {
    paddingTop: '10.5px',
    paddingRight: '38px',
    paddingBottom: '10px',
    paddingLeft: '62.5px',
    backgroundPositionX: '30px',
    letterSpacing: '1px',
    borderRadius: '4px',
  },
}))

export const viewCountry = {
  viewWrapper: createStyle(({ theme }) => ({
    marginTop: '16px',
    marginRight: '12px',
    marginBottom: '16px',
    marginLeft: '12px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      marginTop: '32px',
      marginRight: 0,
      marginBottom: '32px',
      marginLeft: 0,
    },
  })),
  backButton: combineRules(pillButton, backButton),
  countryWrapper: createStyle(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr 1fr',
      gridTemplateRows: 'auto 1fr minmax(96px, auto)',
      gridTemplateAreas:
        '"flag country country" "flag info1 info2" "flag borders borders"',
      marginTop: '80px',
      columnGap: '72px',
      rowGap: '20px',
    },
  })),
  flag: createStyle(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '320px',
    height: '228px',
    marginTop: '64px',
    '> img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      boxShadow: theme.boxShadow,
    },
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      gridArea: 'flag',
      width: '560px',
      height: '400px',
      marginTop: 0,
      marginRight: '72px',
    },
  })),
  countryName: createStyle(({ theme }) => ({
    marginTop: '48px',
    fontWeight: theme.boldFontWeight,
    fontSize: '22px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      gridArea: 'country',
      marginTop: '44px',
      fontSize: '32px',
    },
  })),
  statisticGroup: createStyle(({ theme }) => ({
    marginTop: '12px',
    fontSize: '14px',
    fontWeight: theme.lightFontWeight,
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      marginTop: 0,
      fontSize: '16px',
    },
  })),
  statistic: createStyle(({ theme }) => ({
    marginTop: '18px',
    marginBottom: '18px',
    letterSpacing: '0.1px',
    fontWeight: theme.lightFontWeight,
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      marginTop: '17px',
      marginBottom: '17px',
    },
  })),
  statisticTitle: createStyle(({ theme }) => ({
    fontWeight: theme.baseFontWeight,
  })),
  bordersTitle: createStyle(({ theme }) => ({
    marginTop: '18px',
    fontWeight: theme.baseFontWeight,
    whiteSpace: 'nowrap',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      marginRight: '16px',
    },
  })),
  borders: createStyle(({ theme }) => ({
    marginTop: '12px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      display: 'flex',
      gridArea: 'borders',
      alignItems: 'center',
      marginTop: 0,
    },
  })),
  bordersList: createStyle(() => ({
    display: 'flex',
    flexWrap: 'wrap',
  })),
  borderCountry: createStyle(({ theme }) => ({
    marginTop: '18px',
    marginRight: '16px',
    [`@media screen and (min-width: ${theme.breakPoint})`]: {
      marginRight: '10px',
    },
  })),
}
