import { View, Text, Icon } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, useGlobalSearchParams } from 'expo-router';
import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/redux/hooks';
import { selectLoyaltyProgram } from '@/redux/slices/user';
import { JosefinText } from '@/components/StyledText';
import LoyaltyTierCard from '@/components/loyalty/LoyaltyTierCard';
import { LoyaltyProgramTerminology } from 'square';

export default function SellerAboutScreen() {
  const { id } = useGlobalSearchParams();
  const loyaltyProgram = useAppSelector(selectLoyaltyProgram(id as string));
  return (
    <View>
      {/* shop details */}
      <View>
        <View style={styles.infoContainer}>
          {loyaltyProgram?.location.phoneNumber && (
            <View style={styles.infoRow}>
              <Icon name={'call-outline'} size={24} />
              <Text style={styles.subtitle}>
                {loyaltyProgram.location.phoneNumber}
              </Text>
            </View>
          )}
          {loyaltyProgram?.location.businessEmail && (
            <View style={styles.infoRow}>
              <Icon name={'mail-outline'} size={24} />
              <Text style={styles.subtitle}>
                {loyaltyProgram.location.businessEmail}
              </Text>
            </View>
          )}
          {loyaltyProgram?.location.websiteUrl && (
            <View style={styles.infoRow}>
              <Icon name={'globe-outline'} size={24} />
              <Text style={styles.subtitle}>
                {loyaltyProgram.location.websiteUrl}
              </Text>
            </View>
          )}
        </View>
      </View>
      {/* about */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>About this location</Text>
        <Text style={styles.paragraph}>
          {loyaltyProgram?.location.description}
        </Text>
      </View>
    </View>
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
