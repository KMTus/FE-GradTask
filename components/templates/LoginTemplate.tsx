import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import InputForm from '~/components/molecules/InputForm'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import TextWithLink from '~/components/molecules/TextWithLink'
import useTranslation from '~/hooks/useTranslation'

const LoginTemplate: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const router = useRouter()

  const ButtonLogin = (): void => {
    router.replace('/(tabs)/home')
  }

  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View marginTop={'13%'}>
            <ContentTitle
              title={t('screens.login.welcomeBack')}
              subtitle={t('screens.login.loginPrompt')}
            />
          </View>

          <View marginTop={'25%'} paddingBottom={20} >
            <InputForm
              visibleInputWithIcons={false}
              visibleForgotPassword={true}
              visibleSpace={true}
              onLoginPress={ButtonLogin}
              onLoginGooglePress={ButtonLogin}
              positiveButtonTitle={t('screens.login.signIn')}
              negativeButtonTitle={t('screens.login.signInWithGoogle')}
            />
          </View>
        </ScrollView>

        <View flex={1} justifyContent="flex-end" bottom={20}>
          <TextWithLink
            heading={t('screens.login.signupPrompt')}
            linkText={t('screens.login.joinNow')}
          />
        </View>
      </SafeAreaView>
    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
})

export default LoginTemplate
