import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View, TextInput } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/slices/user';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export default function PhoneScreen() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const [confirmation, setConfirmation] =
    useState<FirebaseAuthTypes.PhoneAuthSnapshot | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  async function handlePhoneAuth() {
    try {
      const confirmation = await auth().verifyPhoneNumber('+1 416-878-3842');
      // const res = await auth().signInWithPhoneNumber();
      setConfirmation(confirmation);
      console.log(confirmation);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCodeSubmit() {
    try {
      if (confirmation) {
        const credential = auth.PhoneAuthProvider.credential(
          confirmation.verificationId,
          otpCode
        );
        const user = await auth().signInWithCredential(credential);
        dispatch(setUser(user));
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (!confirmation) {
    return (
      <View style={styles.container}>
        <View id="recaptcha-container"></View>
        <TextInput
          style={[
            styles.input,
            { borderColor: Colors[colorScheme ?? 'light'].tint + 'fff3B' },
          ]}
          placeholder="Phone number"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            handlePhoneAuth();
          }}
        >
          <Text>Send Code</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={[
            styles.input,
            { borderColor: Colors[colorScheme ?? 'light'].tint + 'fff3B' },
          ]}
          placeholder="Code"
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
          keyboardType="phone-pad"
          onChangeText={setOtpCode}
          value={otpCode}
        />
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            handleCodeSubmit();
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
