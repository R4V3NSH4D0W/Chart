import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {COLORS} from '../constants/theme';

interface ILayout {
  children: React.ReactNode;
}

const LayoutWrapper = ({children}: ILayout) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {children}
    </ScrollView>
  );
};

export default LayoutWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whitePure,
  },
});
