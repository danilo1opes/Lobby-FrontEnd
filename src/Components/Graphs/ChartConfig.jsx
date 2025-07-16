import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';

// todos os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
);

// Configurações padrão globais
ChartJS.defaults.font.family = 'system-ui, -apple-system, sans-serif';
ChartJS.defaults.color = '#666';
ChartJS.defaults.borderColor = '#e0e0e0';

export default ChartJS;
