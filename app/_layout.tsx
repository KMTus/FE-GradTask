import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { TamaguiProvider } from 'tamagui'

import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation, { useInitializeI18n } from '~/hooks/useTranslation'
import store from '~/redux/store'
import config from '~/tamagui.config'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstableSettings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/'
}

export default function RootLayout (): React.ReactElement {
  const { isI18nInitialized } = useInitializeI18n()
  const { fontError, fontsLoaded } = useAppFonts()

  useEffect(() => {
    if ((fontsLoaded || fontError !== null) && isI18nInitialized) {
      try {
        void SplashScreen.hideAsync()
      } catch (error) {
        console.error('Failed to hide splash screen:', error)
      }
    }
  }, [fontsLoaded, fontError, isI18nInitialized])

  if (!fontsLoaded || fontError !== null || !isI18nInitialized) {
    return <></>
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  )
}

function RootLayoutNav (): React.ReactElement {
  const colorScheme = useColorScheme()
  const { t } = useTranslation()

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, title: t('appTitle') }}
          />
          <Stack.Screen
            name="authentication/Login"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
