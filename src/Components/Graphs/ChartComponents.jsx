import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import styles from './ChartComponents.module.css';

// Componente do Gráfico Donut
export const DoughnutChart = ({ data, total }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} acessos (${percentage}%)`;
          },
        },
      },
    },
    cutout: '60%',
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div className={styles.graphItem}>
      <h3 className={styles.chartTitle}>Distribuição de Acessos</h3>
      <div className={styles.chartContainer}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

// Componente do Gráfico de Barras Horizontais
export const HorizontalBarChart = ({ data, topPhotos, dataLength }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.x} acessos`;
          },
          title: function (context) {
            const index = context[0].dataIndex;
            return topPhotos[index]?.title || context[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#666',
        },
        grid: {
          color: '#e0e0e0',
        },
      },
      y: {
        ticks: {
          color: '#666',
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.graphItem}>
      <h3 className={styles.chartTitle}>
        {dataLength > 10 ? 'Top 10 Fotos Mais Acessadas' : 'Ranking de Acessos'}
      </h3>
      <div className={styles.chartContainer}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

// Componente do Gráfico de Linha
export const LineChart = ({ data, topPhotos }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} acessos`;
          },
          title: function (context) {
            const index = context[0].dataIndex;
            return topPhotos[index]?.title || context[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
          maxRotation: 45,
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#666',
        },
        grid: {
          color: '#e0e0e0',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className={styles.graphItem}>
      <h3 className={styles.chartTitle}>Tendência de Performance</h3>
      <div className={styles.chartContainer}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

// Componente de Informações Adicionais
export const InfoCard = ({ dataLength }) => {
  if (dataLength <= 10) return null;

  return (
    <div className={styles.infoCard}>
      <p>
        <strong>📊 Resumo:</strong> Exibindo as {Math.min(10, dataLength)} fotos
        mais acessadas de um total de {dataLength} fotos postadas.
      </p>
      <p>
        <strong>💡 Dica:</strong> Fotos com mais acessos tendem a ter títulos
        mais atrativos e são postadas em horários de maior movimento.
      </p>
    </div>
  );
};

// Componente de Estado Vazio
export const EmptyState = () => {
  return (
    <div className={styles.graphItem}>
      <div className={styles.noData}>
        <p>Nenhum dado disponível</p>
      </div>
    </div>
  );
};
