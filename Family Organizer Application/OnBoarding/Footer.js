import React from "react";
import { View, useWindowDimensions } from "react-native";

import RoundedButton from "./RoundedButton";

const Footer = ({
//   leftButtonLabel = false,
//   leftButtonPress = false,
  rightButtonLabel = false,
  rightButtonPress = false,
}) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.5;
  const FOOTER_PADDING = windowWidth / 15;

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: "white",
        // justifyContent: leftButtonLabel ? 'space-between' : 'center',
        justifyContent:'center',
        height: HEIGHT,
        alignItems: 'center',
        paddingHorizontal: FOOTER_PADDING
      }}
    >
      {/* {leftButtonLabel && (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      )} */}
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  );
};

export default Footer;
