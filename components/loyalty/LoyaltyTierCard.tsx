import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import { LoyaltyProgramRewardTier, LoyaltyProgramTerminology } from 'square';
import { JosefinText } from '../StyledText';
import { getRewardTerminology } from '@/utils/loyalty';

interface LoyaltyTierCardProps {
  tier: LoyaltyProgramRewardTier;
  terminology: LoyaltyProgramTerminology;
}

export default function LoyaltyTierCard({
  tier,
  terminology,
}: LoyaltyTierCardProps) {
  return (
    <View
      key={tier.id}
      style={styles.container}
      lightColor="white"
      darkColor="black"
    >
      <View style={styles.row} lightColor="white" darkColor="black">
        <View style={styles.cost}>
          <Text style={{ fontSize: 24 }}>{tier.points}</Text>
        </View>
        <Text>{getRewardTerminology(tier.points, terminology)}</Text>
      </View>
      <JosefinText style={styles.title}>{tier.name}</JosefinText>
      <View style={styles.separator} />
      <Text
        style={[styles.title, { alignSelf: 'flex-end' }]}
        lightColor="#4baffc"
      >
        Redeem
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    borderRadius: 10,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.75,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    opacity: 0.75,
    padding: 10,
  },
  cost: {
    fontSize: 20,
    borderRadius: 8,
    padding: 5,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
