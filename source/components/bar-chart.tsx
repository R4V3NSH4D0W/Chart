import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {StyleSheet, Dimensions} from 'react-native';

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
          decimalPlaces: 2,
          backgroundColor: '#ffffff',
          backgroundGradientTo: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
