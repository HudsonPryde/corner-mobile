import { View, Text, Icon } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, Slot, useGlobalSearchParams } from 'expo-router';
import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/redux/hooks';
import { selectLoyaltyAccount } from '@/redux/slices/user';
import { JosefinText } from '@/components/StyledText';
import LoyaltyTierCard from '@/components/loyalty/LoyaltyTierCard';
import { LoyaltyProgramTerminology } from 'square';
import SellerTabs from '@/components/SellerTabs';

export default function StoreLayout() {
  const { id } = useGlobalSearchParams();
  const loyaltyAccount = useAppSelector(selectLoyaltyAccount(id as string));
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* back button */}
        <Link href="/(tabs)/" asChild>
          <Pressable style={styles.backButton}>
            <MaterialIcons name={'arrow-back'} size={24} color={'black'} />
          </Pressable>
        </Link>
        {/* banner */}
        <Image
          source={{ uri: loyaltyAccount?.location.posBackgroundUrl }}
          style={styles.banner}
        />
        {/* logo and name/location */}
        <View style={styles.titleRow}>
          <View
            style={{
              padding: 5,
              borderRadius: 13,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 0.75,
            }}
            lightColor="#fff"
          >
            <Image
              source={{ uri: loyaltyAccount?.location.logoUrl }}
              style={styles.logo}
            />
          </View>

          <View>
            <JosefinText weight="semi" style={styles.title}>
              {loyaltyAccount?.location.businessName}
            </JosefinText>
            <JosefinText style={styles.subtitle} weight="light">
              {`${loyaltyAccount?.location.address?.locality}, ${loyaltyAccount?.location.address?.administrativeDistrictLevel1}`}
            </JosefinText>
          </View>
        </View>
        <SellerTabs />
        {/* shop details */}
        <Slot />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    overflow: 'visible',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    opacity: 0.75,
    paddingVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.75,
    paddingVertical: 8,
  },
  infoContainer: {
    padding: 5,
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  rewardTierCost: {
    padding: 5,
    borderRadius: 13,
    backgroundColor: '#9be8ac',
    margin: 5,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 10,
    alignItems: 'center',
  },
  titleRow: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 10,
    alignItems: 'center',
  },
  backButton: {
    borderRadius: 25,
    backgroundColor: 'white',
    padding: 5,
    margin: 5,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.75,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 25,
    marginVertical: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 13,
  },
});
