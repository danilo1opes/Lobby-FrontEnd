import React from 'react';
import './ChartConfig';
import StatsCards from './StatsCards';
import {
  DoughnutChart,
  HorizontalBarChart,
  LineChart,
  InfoCard,
  EmptyState,
} from './ChartComponents';
import {
  calculateStats,
  prepareChartData,
  getVisibleCharts,
} from './chartDataUtils';
import styles from './UserStatsGraphs.module.css';

const UserStatsGraphs = ({ data }) => {
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: [],
  });
  const [topPhotos, setTopPhotos] = React.useState([]);
  const [stats, setStats] = React.useState({
    total: 0,
    average: 0,
    mostAccessed: null,
    totalPhotos: 0,
  });

  React.useEffect(() => {
    if (!data || data.length === 0) {
      setStats({ total: 0, average: 0, mostAccessed: null, totalPhotos: 0 });
      setChartData({ labels: [], datasets: [] });
      setTopPhotos([]);
      return;
    }

    // Calcular estatísticas
    const calculatedStats = calculateStats(data);
    setStats(calculatedStats);

    // Preparar dados para gráficos
    const { labels, datasets, topPhotos: photos } = prepareChartData(data);
    setChartData({ labels, datasets });
    setTopPhotos(photos);
  }, [data]);

  // quais gráficos mostrar
  const visibleCharts = getVisibleCharts(data?.length || 0);

  if (!data || data.length === 0) {
    return (
      <section className={`${styles.graph} animeLeft`}>
        <StatsCards stats={stats} />
        <EmptyState />
      </section>
    );
  }

  return (
    <section className={`${styles.graph} animeLeft`}>
      {/* Cards de estatísticas */}
      <StatsCards stats={stats} />

      {/* Gráfico de distribuição (donut) - só para até 15 fotos */}
      {visibleCharts.showDoughnut && (
        <DoughnutChart data={chartData} total={stats.total} />
      )}

      {/* Gráfico de barras horizontais - TOP 10 */}
      {visibleCharts.showBar && (
        <HorizontalBarChart
          data={chartData}
          topPhotos={topPhotos}
          dataLength={data.length}
        />
      )}

      {/* Gráfico de linha - Tendência */}
      {visibleCharts.showLine && (
        <LineChart data={chartData} topPhotos={topPhotos} />
      )}

      {/* Informação adicional para muitas fotos */}
      {visibleCharts.showInfo && <InfoCard dataLength={data.length} />}
    </section>
  );
};

export default UserStatsGraphs;
