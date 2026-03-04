import React, { useState } from 'react';
import { View, StyleSheet, Text, LayoutChangeEvent } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { ExchangeHistory } from '@/hooks/use-exchange-history';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  data: ExchangeHistory[];
  days: number;
}

// Updated colors per user request
const COLORS = {
  USD: '#84cc16',   // lime
  EUR: '#F1C40F',   // yellow
  USDT: '#f97316',  // orange
};

const SERIES_LABEL: Record<string, string> = {
  USD: 'USD BCV',
  EUR: 'EUR BCV',
  USDT: 'USDT',
};

export const HistoryChart = ({ data }: Props) => {
  // Measure the container width at runtime so the chart fills 100% of its parent
  const [containerWidth, setContainerWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const firstWithData = data.find((d) => d.history.length > 0);
  if (!firstWithData) return null;

  // Build datasets
  const buildDataset = (symbolData: ExchangeHistory) =>
    symbolData.history.map((h, i) => ({
      value: h.value,
      label:
        i % Math.ceil(symbolData.history.length / 6) === 0
          ? format(new Date(h.date), 'd MMM', { locale: es })
          : '',
      labelTextStyle: { color: '#F1C40F', fontSize: 9 },
      // dataPointText: h.value.toString(),
    }));

  // Primary series: prefer USD
  const primarySymbol = data.find((d) => d.symbol === 'USD') ?? firstWithData;
  const primaryDataset = buildDataset(primarySymbol);
  const primaryColor = COLORS[primarySymbol.symbol as keyof typeof COLORS] ?? '#84cc16';

  // USDT series
  const usdtSymbol = data.find((d) => d.symbol === 'USDT');
  const usdtDataset = usdtSymbol ? buildDataset(usdtSymbol) : undefined;
  const usdtColor = COLORS.USDT;

  // EUR series
  const eurSymbol = data.find((d) => d.symbol === 'EUR');
  const eurDataset = eurSymbol ? buildDataset(eurSymbol) : undefined;
  const eurColor = COLORS.EUR;

  // Calculate yAxisOffset and maxValue across all datasets if available
  const datasetsToBound = [primaryDataset];
  if (usdtDataset) datasetsToBound.push(usdtDataset);
  if (eurDataset) datasetsToBound.push(eurDataset);

  const allValues = datasetsToBound.flatMap(dataset => dataset.map(d => d.value));
  const maxDataValue = Math.max(...allValues);
  const minDataValue = Math.min(...allValues);

  // Create an offset slightly below the min value so it doesn't clip the bottom
  const yAxisOffset = Math.max(0, Math.floor(minDataValue * 0.98));

  // maxValue in gifted-charts is the value *above* the yAxisOffset
  const chartMaxValue = Math.ceil((maxDataValue - yAxisOffset) * 1.15); // Add 15% headroom

  // chartWidth is the measured container width minus the yAxis label column (~50px for safety)
  // Fall back to a value that fits mobile screens until layout fires
  const chartWidth = (containerWidth > 0 ? containerWidth - 50 : 300) - 50;

  // Calculate spacing so the chart fills the available width
  // Subtract initialSpacing from chartWidth to get the actual space for intervals
  const initialSpacing = 0;
  const numPoints = primarySymbol.history.length;
  const spacing = numPoints > 1 ? (chartWidth - initialSpacing) / (numPoints - 1) : 0;

  return (
    <View style={styles.container} onLayout={onLayout}>
      {containerWidth > 0 && (
        <LineChart
          data3={eurDataset}
          data2={usdtDataset}
          data={primaryDataset}
          color3={eurColor}
          color2={usdtColor}
          color={primaryColor}
          width={chartWidth}
          initialSpacing={initialSpacing}
          spacing={spacing}
          noOfSections={3}
          height={220}
          dataPointsColor="#F1C40F"
          backgroundColor="transparent"
          rulesColor="#062212ff"
          yAxisColor="#448A44"
          xAxisColor="#448A44"
          yAxisOffset={yAxisOffset}
          maxValue={chartMaxValue}
          thickness={3}
          xAxisLabelTextStyle={styles.axisLabel}
          yAxisTextStyle={styles.axisLabel}
          // hideDataPoints
          // pointerConfig={{
          //   pointerStripUptoDataPoint: true,
          //   pointerStripColor: 'rgba(241, 196, 15, 0.5)',
          //   pointerStripWidth: 2,
          //   strokeDashArray: [2, 5],
          //   radius: 4,
          //   pointerColor: '#F1C40F',
          //   pointerLabelComponent: (items: any) => {
          //     return (
          //       <View style={styles.pointerLabel}>
          //         <Text style={styles.pointerDate}>
          //           {items[0].label || format(new Date(primarySymbol.history[items[0].index]?.date), 'd MMM', { locale: es })}
          //         </Text>
          //         <View style={styles.pointerValues}>
          //           {items.map((item: any, index: number) => {
          //             const seriesSymbol = index === 0 ? primarySymbol.symbol : (index === 1 ? usdtSymbol?.symbol : eurSymbol?.symbol);
          //             const color = index === 0 ? primaryColor : (index === 1 ? usdtColor : eurColor);
          //             if (!seriesSymbol) return null;
          //             return (
          //               <View key={index} style={styles.pointerValueRow}>
          //                 <View style={[styles.legendDot, { backgroundColor: color, width: 8, height: 8 }]} />
          //                 <Text style={styles.pointerValueText}>
          //                   {seriesSymbol}: {item.value}
          //                 </Text>
          //               </View>
          //             );
          //           })}
          //         </View>
          //       </View>
          //     );
          //   },
          //   pointerLabelWidth: 120,
          //   pointerLabelHeight: 80,
          //   activatePointersOnLongPress: false,
          // }}
        />
      )}

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: primaryColor },
            ]}
          />
          <Text style={styles.legendText}>{SERIES_LABEL[primarySymbol.symbol] ?? primarySymbol.symbol}</Text>
        </View>
        {eurSymbol && (
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: eurColor },
              ]}
            />
            <Text style={styles.legendText}>{SERIES_LABEL[eurSymbol.symbol] ?? eurSymbol.symbol}</Text>
          </View>
        )}
        {usdtSymbol && (
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: usdtColor },
              ]}
            />
            <Text style={styles.legendText}>{SERIES_LABEL[usdtSymbol.symbol] ?? usdtSymbol.symbol}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(27, 107, 62, 0.35)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#448A44',
    marginTop: 8,
  },
  axisLabel: {
    color: '#F1C40F',
    fontSize: 9,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: '#F1C40F',
    fontSize: 12,
  },
  pointerLabel: {
    backgroundColor: '#062212',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#448A44',
    minWidth: 100,
  },
  pointerDate: {
    color: '#F1C40F',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  pointerValues: {
    gap: 2,
  },
  pointerValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointerValueText: {
    color: '#fff',
    fontSize: 10,
  },
});
