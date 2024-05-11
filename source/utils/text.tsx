import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';

import {COLORS} from '../constants/theme';

type AATextStyle = TextStyle | {marginBottom: number};

interface AATextProps extends TextProps {
  children: ReactNode;
  style?: AATextStyle | AATextStyle[];
}

const AAText: React.FC<AATextProps> = ({children, style, ...props}) => {
  return (
    <Text
      style={[styles.defaultText, ...(Array.isArray(style) ? style : [style])]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default AAText;
