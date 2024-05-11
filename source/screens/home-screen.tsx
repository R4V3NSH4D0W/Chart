import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';

import Chart from '../components/chart';
import PieChartComponent from '../components/piechart';
import BarChartComponent from '../components/bar-chart';

import AAText from '../utils/text';
import AADropDown from '../utils/drop-down';

import {IApiProps, IApiResponse} from '../constants/app.types';
import {dropDownItems, dropDownSourceItems} from '../constants/app.constant';

import {getData} from '../api/api.helper';
import LayoutWrapper from '../wrappers/layout-wrapper';

const HomeScreen = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState<IApiResponse | null>(null);

  const [selectedDataType, setSelectedDataType] = useState('open');
  const [selectedDataSource, setSelectedDataSource] = useState<IApiProps>({
    symbol: 'IBM',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const stockData = await getData(selectedDataSource);
      setData(stockData);
      setLoading(false);
    };

    fetchData();
  }, [selectedDataSource]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!data || !data['Weekly Adjusted Time Series']) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  const weeklyData = data['Weekly Adjusted Time Series'];
  const timestamps = Object.keys(weeklyData).slice(startIndex, startIndex + 7);
  const values = timestamps.map(timestamp => {
    const entry = weeklyData[timestamp];

    return {
      time: timestamp,
      open: parseFloat(entry['1. open']),
      high: parseFloat(entry['2. high']),
      low: parseFloat(entry['3. low']),
      close: parseFloat(entry['4. close']),
      volume: parseInt(entry['6. volume']),
    };
  });

  const filteredData = values.map(entry => ({
    time: entry.time,
    value: entry[selectedDataType],
  }));

  const startDate = timestamps.length > 0 ? timestamps[0] : '';
  const endDate =
    timestamps.length > 0 ? timestamps[timestamps.length - 1] : '';

  const handelPast = () => {
    if (startIndex + 7 < Object.keys(weeklyData).length) {
      setStartIndex(startIndex + 7);
    }
  };

  const handelNew = () => {
    setStartIndex(0);
  };

  return (
    <LayoutWrapper>
      <View style={styles.container}>
        {filteredData.length > 0 && (
          <>
            <AAText style={styles.text}>
              Data Source {selectedDataSource.symbol} and type{' '}
              {selectedDataType} from {endDate} to {startDate}
            </AAText>
            <View style={styles.dropDownContainer}>
              <AADropDown
                data={dropDownSourceItems}
                onValueChange={val => {
                  setSelectedDataSource({symbol: val});
                }}
              />
              <AADropDown
                data={dropDownItems}
                onValueChange={val => setSelectedDataType(val)}
              />
            </View>

            <View style={styles.button}>
              <Button
                title="Latest"
                onPress={handelNew}
                disabled={startIndex == 0}
              />
              <Button title="Past" onPress={handelPast} />
            </View>

            <Chart data={filteredData} />
            <PieChartComponent data={filteredData} />
            <BarChartComponent data={filteredData} />
          </>
        )}
      </View>
    </LayoutWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropDownContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
});
