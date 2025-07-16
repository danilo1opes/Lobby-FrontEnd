// Função para calcular estatísticas dos dados
export const calculateStats = (data) => {
  if (!data || data.length === 0) {
    return {
      total: 0,
      average: 0,
      mostAccessed: null,
      totalPhotos: 0,
    };
  }

  const sortedData = [...data].sort(
    (a, b) => Number(b.acessos) - Number(a.acessos),
  );
  const dataValues = data.map((item) => Number(item.acessos));
  const totalAccesses = dataValues.reduce((a, b) => a + b, 0);
  const average = Math.round(totalAccesses / data.length);
  const mostAccessed = sortedData[0];

  return {
    total: totalAccesses,
    average,
    mostAccessed,
    totalPhotos: data.length,
  };
};

export const prepareChartData = (data, maxItems = 10) => {
  if (!data || data.length === 0) return { labels: [], datasets: [] };

  const sortedData = [...data].sort(
    (a, b) => Number(b.acessos) - Number(a.acessos),
  );
  const displayData =
    data.length > maxItems ? sortedData.slice(0, maxItems) : sortedData;

  const labels = displayData.map((item) => {
    return item.title.length > 15
      ? item.title.substring(0, 15) + '...'
      : item.title;
  });

  const values = displayData.map((item) => Number(item.acessos));

  const colors = values.map((_, index) => {
    const intensity = 1 - (index / displayData.length) * 0.6;
    return `rgba(145, 57, 243, ${intensity})`;
  });

  const borderColors = values.map((_, index) => {
    const intensity = 1 - (index / displayData.length) * 0.4;
    return `rgba(145, 57, 243, ${intensity})`;
  });

  return {
    labels,
    datasets: [
      {
        label: 'Acessos',
        data: values,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverBackgroundColor: colors.map((color) =>
          color.replace(/[\d.]+\)$/g, '0.8)'),
        ),
        hoverBorderColor: borderColors,
        hoverBorderWidth: 3,
      },
    ],
    topPhotos: displayData,
  };
};

// Função para determinar quais gráficos mostrar
export const getVisibleCharts = (dataLength) => {
  return {
    showDoughnut: dataLength <= 15,
    showBar: true,
    showLine: true,
    showInfo: dataLength > 10,
  };
};

// Função para truncar texto
export const truncateText = (text, maxLength = 15) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Função para formatar números
export const formatNumber = (num) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

// Função para calcular porcentagem
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return ((value / total) * 100).toFixed(1);
};
