import { theme } from "@/constants/theme";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
} from "react-native-reanimated";

const LoadingAnimation: React.FC = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 600,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [progress]);

  const ball1Style = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 0.5, 1], [10, 16, 10]),
    height: interpolate(progress.value, [0, 0.5, 1], [10, 16, 10]),
  }));

  const ball2Style = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 0.5, 1], [16, 10, 16]),
    height: interpolate(progress.value, [0, 0.5, 1], [16, 10, 16]),
  }));

  const ball3Style = useAnimatedStyle(() => ({
    width: interpolate(progress.value, [0, 0.5, 1], [16, 16, 10]),
    height: interpolate(progress.value, [0, 0.5, 1], [16, 16, 10]),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, ball1Style]} />
      <Animated.View style={[styles.ball, ball2Style]} />
      <Animated.View style={[styles.ball, ball3Style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.colors.base.baseBlackModalOpacity,
  },
  ball: {
    borderRadius: 50,
    backgroundColor: theme.colors.base.baseWhite,
    marginHorizontal: 8,
  },
});

export default LoadingAnimation;
