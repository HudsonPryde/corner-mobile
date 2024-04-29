import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextComponent,
  ViewComponent,
} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { Animated, useAnimatedValue } from 'react-native';
import { Link, usePathname } from 'expo-router';

export default function SellerTabs({ programId }: { programId: string }) {
  const path = usePathname();
  const [activeTab, setActiveTab] = useState(path === '/seller/' ? 0 : 1);
  const indicatorPos = useAnimatedValue(0);
  const indicatorWidth = useAnimatedValue(0);
  const tabsRef = useRef<View>(null);
  const aboutTabRef = useRef<View>(null);
  const rewardsTabRef = useRef<View>(null);
  const tabRefs = [aboutTabRef, rewardsTabRef];

  useEffect(() => {
    tabRefs[activeTab]?.current?.measure((x, y, w, h) => {
      tabRefs[activeTab]?.current?.measureLayout(
        tabsRef.current as View,
        (x, y) => {
          Animated.timing(indicatorPos, {
            toValue: x,
            duration: 300,
            useNativeDriver: false,
          }).start();
          Animated.timing(indicatorWidth, {
            toValue: w,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      );
    });
  }, [activeTab, tabsRef, aboutTabRef, rewardsTabRef]);

  return (
    <View style={styles.container}>
      <View style={styles.tabs} ref={tabsRef}>
        <Link
          push
          href={{ pathname: '/seller/', params: { id: programId } }}
          asChild
        >
          <Pressable onPress={() => setActiveTab(0)} ref={aboutTabRef}>
            <Text style={styles.tab}>About</Text>
          </Pressable>
        </Link>
        <Link push href={`/seller/loyalty/${programId}`} asChild>
          <Pressable onPress={() => setActiveTab(1)} ref={rewardsTabRef}>
            <Text style={styles.tab}>Rewards</Text>
          </Pressable>
        </Link>
      </View>
      <Animated.View
        style={[
          styles.indicator,
          { transform: [{ translateX: indicatorPos }], width: indicatorWidth },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: 20,
    width: '100%',
  },
  tab: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: '500',
  },
  indicator: {
    height: 3,
    borderRadius: 1,
    backgroundColor: '#9be8ac',
  },
});
