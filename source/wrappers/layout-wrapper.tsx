import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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
