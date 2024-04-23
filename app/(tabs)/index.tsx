import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { JosefinText } from '@/components/StyledText';
import { Text, View } from '@/components/Themed';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectUser,
  setUser,
  selectLoyaltyPrograms,
} from '@/redux/slices/user';
import { useGetUserQuery, useGetLoyaltyProgramsQuery } from '@/redux/api/user';
import { useGetSellersQuery } from '@/redux/api/sellers';
import { Loyalty, User } from '@/types';
import auth from '@react-native-firebase/auth';
import LoyaltyAccountCard from '@/components/LoyaltyAccountCard';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const programs = useAppSelector(selectLoyaltyPrograms);
  // get the user's uid from firebase
  const uid = auth().currentUser?.uid;

  // get the user data from the api using the uid
  const { isFetching: fetchingUser } = useGetUserQuery(uid as string, {
    skip: !uid,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // get the users loyalty programs
  const { isFetching: fetchingLoyaltyPrograms } = useGetLoyaltyProgramsQuery(
    uid as string,
    {
      skip: !uid,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  // fetch local sellers
  const { data: sellers, isFetching: fetchingSellers } = useGetSellersQuery();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Text
            style={[
              styles.title,
              { alignSelf: 'flex-start', paddingHorizontal: 20 },
            ]}
          >
            Local shops
          </Text>
          <ScrollView
            horizontal
            style={{ width: '100%', paddingHorizontal: 20 }}
          >
            {sellers?.map((seller, index) => (
              <View
                key={index}
                style={[styles.card, { alignSelf: 'flex-start' }]}
              >
                {/* banner */}
                <Image
                  source={{ uri: seller.posBackgroundUrl }}
                  style={{ width: 250, height: 100, borderRadius: 15 }}
                />
                {/* name and details */}
                <View
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                    alignSelf: 'flex-start',
                    borderRadius: 15,
                  }}
                  lightColor="#fff"
                  darkColor="#000"
                >
                  <Text style={styles.title}>{seller.businessName}</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={3}
                    style={styles.description}
                  >
                    {seller.description}
                  </Text>
                </View>
                {/* logo */}
                <Image
                  source={{ uri: seller.logoUrl }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 13,
                    position: 'absolute',
                    top: 10,
                    left: 10,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
          <JosefinText
            weight="semi"
            style={[
              styles.title,
              { alignSelf: 'flex-start', paddingHorizontal: 20 },
            ]}
          >
            Your programs
          </JosefinText>
          {programs?.map((loyalty: Loyalty, index: number) => (
            <LoyaltyAccountCard key={index} loyaltyAccount={loyalty} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
    rowGap: 30,
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
  card: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#fff',
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    fontSize: 12,
    marginLeft: 10,
    width: 200,
    height: 50,
  },
  program: {
    borderRadius: 20,
    padding: 5,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
