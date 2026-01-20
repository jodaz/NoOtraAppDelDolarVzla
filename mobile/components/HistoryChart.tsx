import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { ExchangeHistory } from '@/hooks/use-exchange-history';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

echarts.use([
  SVGRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
]);

interface Props {
  data: ExchangeHistory[];
  days: number;
}

const { width } = Dimensions.get('window');

export const HistoryChart = ({ data, days }: Props) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (chartRef.current) {
      chart = echarts.init(chartRef.current, 'dark', {
        renderer: 'svg',
        width: width - 80,
        height: 300,
      });
      setOption(chart);
    }
    return () => chart?.dispose();
  }, [data]);

  const setOption = (chart: any) => {
    // Process data for echarts
    // We assume all symbols have historical data for the same dates or at least overlapping
    // For simplicity, we'll take the dates from the first symbol that has data
    const firstWithData = data.find(d => d.history.length > 0);
    if (!firstWithData) return;

    const dates = firstWithData.history.map(h => 
      format(new Date(h.date), 'd MMM', { locale: es })
    );

    const series = data.map(symbolData => ({
      name: symbolData.symbol === 'USD' ? 'USD BCV' : symbolData.symbol === 'EUR' ? 'EUR BCV' : 'USDT',
      type: 'line',
      data: symbolData.history.map(h => h.value),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 3,
      },
    }));

    const option = {
      backgroundColor: 'transparent',
      color: ['#FFFFFF', '#F1C40F', '#14b8a6'], // USD (White), EUR (Gold), USDT (Cyan)
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1B6B3E',
        borderColor: '#448A44',
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        data: series.map(s => s.name),
        bottom: 0,
        textStyle: {
          color: '#F1C40F',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#448A44',
          },
        },
        axisLabel: {
          color: '#F1C40F',
          fontSize: 10,
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#145931',
          },
        },
        axisLabel: {
          color: '#F1C40F',
          fontSize: 10,
        },
      },
      series: series,
    };

    chart.setOption(option);
  };

  return (
    <View style={styles.container}>
      <SvgChart ref={chartRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 320,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingVertical: 10,
    marginTop: 20,
  },
});
