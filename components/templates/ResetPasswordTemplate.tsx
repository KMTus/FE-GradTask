import { Eye, EyeOff, LockKeyhole } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import ContentTitle from '~/components/atoms/ContentTitle'
import InputWithIcons from '~/components/atoms/InputWithIcons'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import getColors from '~/constants/Colors'
import useTranslation from '~/hooks/useTranslation'

const ResetPasswordTemplate: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const colors = getColors(useColorScheme())
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)

  const renderPasswordIcon = (): JSX.Element => {
    const IconVisiablePassword = showPassword ? EyeOff : Eye
    return (
      <IconVisiablePassword
        size={16}
        color={colors.oceanTeal}
        onPress={() => { setShowPassword(!showPassword) }}
      />
    )
  }
  const renderPasswordIconComfirm = (): JSX.Element => {
    const IconVisiablePassword = showPasswordConfirm ? EyeOff : Eye
    return (
      <IconVisiablePassword
        size={16}
        color={colors.oceanTeal}
        onPress={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
      />
    )
  }

  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <View marginTop={'13%'}>
          <ContentTitle
            title={t('screens.resetPassword.newPassword')}
            subtitle={t('screens.resetPassword.resetPasswordPrompt')}
          />
        </View>

        <View marginTop={'25%'} gap={20}>
          <InputWithIcons
            iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
            placeholder={t('screens.resetPassword.newPassword')}
            iconLeft={renderPasswordIcon()}
            secureTextEntry={!showPassword}
            onChangeText={() => {}}
          />

          <InputWithIcons
            iconRight={<LockKeyhole size={16} color={colors.oceanTeal} />}
            placeholder={t('screens.resetPassword.confirmNewPassword')}
            iconLeft={renderPasswordIconComfirm()}
            secureTextEntry={!showPasswordConfirm}
            onChangeText={() => {}}
          />
        </View>

        <View flex={1} justifyContent="flex-end">
          <PositiveButton
            title={t('screens.resetPassword.confirmNewPassword')}
          />
        </View>
      </SafeAreaView>

    </LinearGradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})

export default ResetPasswordTemplate
