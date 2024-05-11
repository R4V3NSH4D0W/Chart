import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';

import {COLORS} from '../constants/theme';

interface IChart {
  data: IData[];
}

interface IData {
  time: string;
  value: number;
}

const Chart = ({data}: IChart) => {
  return (
    <>
      <LineChart
        data={{
          labels: data.map(entry => entry.time),
          datasets: [{data: data.map(entry => entry.value)}],
        }}
        height={360}
        yAxisLabel="$"
        xLabelsOffset={-12}
        width={Dimensions.get('window').width * 0.9}
        chartConfig={{
          backgroundGradientTo: '#002288',
          backgroundGradientFrom: '#0044ff',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2,
        }}
        bezier
        verticalLabelRotation={60}
        renderDotContent={({x, y, index}) => (
          <Text
            key={index}
            style={{
              top: y - 20,
              left: x - 15,
              fontSize: 10,
              textAlign: 'center',
              color: COLORS.white,
              position: 'absolute',
              fontWeight: 'normal',
            }}>
            ${data[index].value}
          </Text>
        )}
      />
    </>
  );
};

export default Chart;
