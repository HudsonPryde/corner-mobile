import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectUser } from '@/redux/slices/user';
import { Text, View } from '@/components/Themed';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const user = useAppSelector(selectUser);
  return (
    <View style={styles.container}>
      {/* Icon and first/last name */}
      <View style={styles.header}>
        <View style={styles.icon}>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>
            {user?.given_name[0].toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            {user?.given_name} {user?.family_name}
          </Text>
          <Text style={styles.detail}>{user?.phone_number}</Text>
        </View>
      </View>
      {/* profile details */}
      <View style={styles.item}>
        <MaterialIcons name="email" size={24} color="gray" />
        <Text>{user?.email_address}</Text>
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e04e53',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    fontSize: 16,
    color: 'gray',
  },
  item: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 10,
  },
});
