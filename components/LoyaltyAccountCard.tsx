import { View, Text } from '@/components/Themed';
import { Loyalty } from '@/types';
import { Image } from 'expo-image';
import { StyleSheet, Pressable } from 'react-native';
import { MonoText } from './StyledText';
import { Link } from 'expo-router';

interface LoyaltyAccountCardProps {
  loyaltyAccount: Loyalty;
}

export default function LoyaltyAccountCard({
  loyaltyAccount,
}: LoyaltyAccountCardProps) {
  return (
    <Link
      href={{
        pathname: `/seller/loyalty/${loyaltyAccount.account.id as string}`,
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <View
          style={{ flexDirection: 'row' }}
          lightColor="#fff"
          darkColor="#000"
        >
          <Image
            source={{ uri: loyaltyAccount.location.logoUrl }}
            style={styles.logo}
          />
          <View
            style={{ justifyContent: 'center', marginLeft: 10 }}
            lightColor="#fff"
            darkColor="#000"
          >
            <Text style={styles.balance}>{loyaltyAccount.account.balance}</Text>
            <Text style={{ fontSize: 12, opacity: 0.75 }}>
              {(loyaltyAccount.account.balance as number) === 1
                ? loyaltyAccount.program.terminology?.one
                : loyaltyAccount.program.terminology?.other}
            </Text>
          </View>
        </View>
        <Text
          style={styles.storeName}
          adjustsFontSizeToFit={true}
          numberOfLines={3}
          minimumFontScale={0.5}
        >
          {loyaltyAccount.location.businessName}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 25,
    padding: 10,
    margin: 30,
    rowGap: 10,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 13,
  },
  balance: {
    fontSize: 24,
    fontWeight: '600',
  },
  storeName: {
    fontSize: 24,
    fontWeight: '600',
    height: 75,
  },
});
