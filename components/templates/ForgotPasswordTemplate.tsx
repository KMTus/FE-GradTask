import { ChevronLeft, Phone } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { Alert, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'tamagui'

import { request } from '~/apis/HttpClient'
import ContentTitle from '~/components/atoms/ContentTitle'
import InputWithIcons from '~/components/atoms/InputWithIcons'
import { PositiveButton } from '~/components/atoms/PositiveButton'
import AppHeader from '~/components/molecules/common/AppHeader'
import LinearGradientBackground from '~/components/molecules/LinearGradientBackground'
import getColors from '~/constants/Colors'
import { useAppFonts } from '~/hooks/useAppFonts'
import useTranslation from '~/hooks/useTranslation'

const validatePhone = (phone: string): boolean => {
  const regex = /^(0[3|5|7|8|9]{1})[0-9]{8}$/
  return regex.test(phone)
}

const ForgotTemplate = (): React.ReactElement => {
  const { t } = useTranslation()
  const { fonts } = useAppFonts()

  const colors = getColors(useColorScheme())
  const router = useRouter()

  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [phoneError, setPhoneError] = useState<string>('')

  const validatePhoneNumber = (value: string): void => {
    setPhoneError(
      validatePhone(value) ? '' : t('Số điện thoại không đúng')
    )
  }

  const handleSendOTP = async (): Promise<void> => {
    try {
      validatePhoneNumber(phoneNumber)

      if (
        isNil(phoneError) ||
        phoneNumber === ''
      ) { return }

      const payload = {
        phone_number: phoneNumber
      }

      await request.post('/otp', payload)
      router.push({
        params: { phoneNumber: JSON.stringify(phoneNumber) },
        pathname: '/authentication/VerifyOTP'
      })
    } catch (err) {
      Alert.alert(
        t('screens.signUp.false'),
        t('Gửi OTP Thất bại')
      )
    }
  }

  return (
    <LinearGradientBackground>
      <SafeAreaView style={styles.container}>
        <View flex={1}>
          <AppHeader
            headerTitle={t('common.back')}
            fontFamily={fonts.JetBrainsMonoRegular}
            leftIcon={
              <ChevronLeft size={24} onPress={() => { router.back() }}/>}
          />
          <View marginTop={'13%'}>
            <ContentTitle
              title={t('screens.forgot.forgotPassword')}
              subtitle={t('screens.forgot.titleForgot')}
            />
          </View>

          <View marginTop={'25%'}>
            <InputWithIcons
              onChangeText={(value) => {
                setPhoneNumber(value)
                validatePhoneNumber(value)
              }}
              iconRight={<Phone size={16} color={colors.oceanTeal} />}
              placeholder={t('screens.forgot.phoneNumber')}
              errorMessage={phoneError}
            />
          </View>
        </View>
        <View >
          <PositiveButton
            title={t('screens.forgot.sendCode')}
            onPress={() => {
              handleSendOTP().catch(err => { console.log(err) })
            }}
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

export default ForgotTemplate
