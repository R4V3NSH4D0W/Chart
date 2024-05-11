import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {View, StyleSheet, Dimensions} from 'react-native';

interface IChart {
  data: IData[];
}

interface IData {
  time: string;
  value: number;
}

const BarChartComponent = ({data}: IChart) => {
  return (
    <>
      <BarChart
        data={{
          labels: data.map(entry => entry.time),
          datasets: [
            {
              data: data.map(entry => entry.value),
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9}
        height={350}
        yAxisLabel="$"
        yAxisSuffix=""
        xLabelsOffset={-15}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 2,
        }}
        verticalLabelRotation={90}
        style={styles.chart}
      />
    </>
  );
};

export default BarChartComponent;

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
});
