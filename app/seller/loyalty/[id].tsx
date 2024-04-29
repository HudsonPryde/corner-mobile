import { View, Text } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import {
  LoyaltyProgramAccrualRule,
  LoyaltyProgramRewardTier,
  LoyaltyProgramTerminology,
  Money,
} from 'square';
import { JosefinText } from '@/components/StyledText';
import { getRewardTerminology } from '@/utils/loyalty';
import LoyaltyTierCard from '@/components/loyalty/LoyaltyTierCard';
import { useGlobalSearchParams } from 'expo-router';
import { useAppSelector } from '@/redux/hooks';
import { selectLoyaltyProgram } from '@/redux/slices/user';

export default function SellerLoyaltyScreen() {
  const { id } = useGlobalSearchParams();
  const loyaltyProgram = useAppSelector(selectLoyaltyProgram(id as string));
  console.log(loyaltyProgram?.program?.rewardTiers);

  function amountMoneyToString(amountMoney: Money | undefined) {
    if (!amountMoney) return null;
    let amount = Number(amountMoney.amount) / 100;
    return `$${amount.toFixed(2)} ${amountMoney.currency}`;
  }

  function AccrualRule({ rule }: { rule: LoyaltyProgramAccrualRule }) {
    if (rule.accrualType === 'SPEND') {
      return (
        <View>
          <Text>
            {rule.points}{' '}
            {getRewardTerminology(
              rule?.points as number,
              loyaltyProgram?.program?.terminology as LoyaltyProgramTerminology
            )}{' '}
            for every {amountMoneyToString(rule?.spendData?.amountMoney)} spent{' '}
            {rule.spendData?.taxMode?.replace('_', ' ').toLowerCase()}
          </Text>
        </View>
      );
    } else if (rule.accrualType === 'VISIT') {
      return (
        <View>
          <Text>
            {rule.points} points for every visit{' '}
            {rule.visitData?.minimumAmountMoney
              ? `when spending ${
                  rule.visitData?.minimumAmountMoney
                } or more ${rule.visitData?.taxMode
                  ?.replace('_', ' ')
                  .toLowerCase()}`
              : null}
          </Text>
        </View>
      );
    }
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <JosefinText style={styles.title}>Loyalty Program</JosefinText>
        {/* points */}
        <Text style={{ fontSize: 26 }}>{loyaltyProgram?.account.balance}</Text>
      </View>
      {/* current balance */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 10,
          marginTop: -5,
        }}
      >
        <Text style={{ alignSelf: 'center', fontSize: 12, opacity: 0.8 }}>
          current balance
        </Text>
      </View>
      {/* program details */}
      <View style={styles.detailsContainer}>
        {loyaltyProgram?.program?.accrualRules?.map((rule, index) => (
          <View style={styles.details} key={index}>
            <AccrualRule rule={rule} />
          </View>
        ))}
      </View>
      <View style={styles.tierContainer}>
        {loyaltyProgram?.program?.rewardTiers?.map((tier) => (
          <LoyaltyTierCard
            key={tier.id}
            tier={tier}
            terminology={
              loyaltyProgram?.program?.terminology as LoyaltyProgramTerminology
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tierContainer: {
    marginVertical: 10,
    rowGap: 10,
  },
  detailsContainer: {
    marginVertical: 10,
    rowGap: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceContainer: {
    borderRadius: 10,
    padding: 5,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.75,
  },
});
