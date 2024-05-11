import React from 'react';
import {Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

import {COLORS} from '../constants/theme';

interface IChart {
  data: IData[];
}

interface IData {
  time: string;
  value: number;
}

const PieChartComponent = ({data}: IChart) => {
  const colors = shuffleColors([
    '#FF5733',
    '#FFC300',
    '#36DB3E',
    '#4A90E2',
    '#9B59B6',
    '#E74C3C',
    '#34495E',
  ]);

  return (
    <>
      <PieChart
        data={data.map((entry, index) => ({
          name: entry.time,
          value: entry.value,
          legendFontSize: 14,
          valueAccessor: 'value',
          legendFontColor: COLORS.black,
          color: colors[index % colors.length],
        }))}
        height={210}
        width={Dimensions.get('window').width * 0.95}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientTo: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="value"
        paddingLeft="0"
        backgroundColor="transparent"
      />
    </>
  );
};

const shuffleColors = (colors: string[]) => {
  let currentIndex = colors.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = colors[currentIndex];
    colors[currentIndex] = colors[randomIndex];
    colors[randomIndex] = temporaryValue;
  }

  return colors;
};

export default PieChartComponent;
