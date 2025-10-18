// Data from CSV files
const beforeData = [
  {
    "model": "Alpaca-13B",
    "params": "13B",
    "biasPairRatio": 0.493,
    "toxicity": 0.09,
    "regardNegative": 0.38
  },
  {
    "model": "Alpaca-7B",
    "params": "7B",
    "biasPairRatio": 0.493,
    "toxicity": 0.07,
    "regardNegative": 0.303
  },
  {
    "model": "Llama-2-13B-HF",
    "params": "13B",
    "biasPairRatio": 0.413,
    "toxicity": 0.01,
    "regardNegative": 0.113
  },
  {
    "model": "Llama-2-7B-HF",
    "params": "7B",
    "biasPairRatio": 0.453,
    "toxicity": 0.013,
    "regardNegative": 0.147
  },
  {
    "model": "OpenLLaMA-13B",
    "params": "13B",
    "biasPairRatio": 0.48,
    "toxicity": 0.01,
    "regardNegative": 0.3
  },
  {
    "model": "OpenLLaMA-7B",
    "params": "7B",
    "biasPairRatio": 0.513,
    "toxicity": 0.013,
    "regardNegative": 0.34
  },
  {
    "model": "OrcaMini-v3-13B",
    "params": "13B",
    "biasPairRatio": 0.5,
    "toxicity": 0.027,
    "regardNegative": 0.143
  },
  {
    "model": "OrcaMini-v3-7B",
    "params": "7B",
    "biasPairRatio": 0.513,
    "toxicity": 0.023,
    "regardNegative": 0.183
  },
  {
    "model": "Platypus2-13B",
    "params": "13B",
    "biasPairRatio": 0.517,
    "toxicity": 0.093,
    "regardNegative": 0.41
  },
  {
    "model": "Platypus2-7B",
    "params": "7B",
    "biasPairRatio": 0.517,
    "toxicity": 0.11,
    "regardNegative": 0.37
  },
  {
    "model": "StableBeluga-13B",
    "params": "13B",
    "biasPairRatio": 0.43,
    "toxicity": 0.043,
    "regardNegative": 0.293
  },
  {
    "model": "StableBeluga-7B",
    "params": "7B",
    "biasPairRatio": 0.44,
    "toxicity": 0.037,
    "regardNegative": 0.257
  },
  {
    "model": "Vicuna-13B",
    "params": "13B",
    "biasPairRatio": 0.483,
    "toxicity": 0.023,
    "regardNegative": 0.16
  },
  {
    "model": "Vicuna-7B",
    "params": "7B",
    "biasPairRatio": 0.477,
    "toxicity": 0.023,
    "regardNegative": 0.15
  }
];

const afterData = [
  {
    "model": "Alpaca-13B",
    "params": "13B",
    "biasPairRatio": 0.337,
    "toxicity": 0.067,
    "regardNegative": 0.163
  },
  {
    "model": "Alpaca-7B",
    "params": "7B",
    "biasPairRatio": 0.333,
    "toxicity": 0.023,
    "regardNegative": 0.073
  },
  {
    "model": "Llama-2-13B-HF",
    "params": "13B",
    "biasPairRatio": 0.27,
    "toxicity": 0.01,
    "regardNegative": 0.103
  },
  {
    "model": "Llama-2-7B-HF",
    "params": "7B",
    "biasPairRatio": 0.347,
    "toxicity": 0.01,
    "regardNegative": 0.113
  },
  {
    "model": "OpenLLaMA-13B",
    "params": "13B",
    "biasPairRatio": 0.32,
    "toxicity": 0.01,
    "regardNegative": 0.17
  },
  {
    "model": "OpenLLaMA-7B",
    "params": "7B",
    "biasPairRatio": 0.333,
    "toxicity": 0.013,
    "regardNegative": 0.143
  },
  {
    "model": "OrcaMini-v3-13B",
    "params": "13B",
    "biasPairRatio": 0.24,
    "toxicity": 0.023,
    "regardNegative": 0.09
  },
  {
    "model": "OrcaMini-v3-7B",
    "params": "7B",
    "biasPairRatio": 0.407,
    "toxicity": 0.02,
    "regardNegative": 0.18
  },
  {
    "model": "Platypus2-13B",
    "params": "13B",
    "biasPairRatio": 0.32,
    "toxicity": 0.057,
    "regardNegative": 0.133
  },
  {
    "model": "Platypus2-7B",
    "params": "7B",
    "biasPairRatio": 0.377,
    "toxicity": 0.037,
    "regardNegative": 0.13
  },
  {
    "model": "StableBeluga-13B",
    "params": "13B",
    "biasPairRatio": 0.34,
    "toxicity": 0.027,
    "regardNegative": 0.133
  },
  {
    "model": "StableBeluga-7B",
    "params": "7B",
    "biasPairRatio": 0.32,
    "toxicity": 0.02,
    "regardNegative": 0.053
  },
  {
    "model": "Vicuna-13B",
    "params": "13B",
    "biasPairRatio": 0.317,
    "toxicity": 0.02,
    "regardNegative": 0.133
  },
  {
    "model": "Vicuna-7B",
    "params": "7B",
    "biasPairRatio": 0.3,
    "toxicity": 0.017,
    "regardNegative": 0.133
  }
];


let beforeChart = null;
let afterChart = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  populateModelSelect();
  setupEventListeners();
});

function populateModelSelect() {
  const select = document.getElementById('modelSelect');
  beforeData.forEach(item => {
    const option = document.createElement('option');
    option.value = item.model;
    option.textContent = `${item.model} (${item.params})`;
    select.appendChild(option);
  });
}

function setupEventListeners() {
  document.getElementById('modelSelect').addEventListener('change', function(e) {
    const selectedModel = e.target.value;
    if (selectedModel) {
      // 显示 loading，隐藏图表
      showLoading();
      
      // 3-5秒后显示图表（随机延迟）
      const delay = Math.random() * 2000 + 3000; // 3000-5000ms
      setTimeout(() => {
        updateCharts(selectedModel);
        hideLoading();
        showCharts();
      }, delay);
    } else {
      hideLoading();
      hideCharts();
    }
  });
}

function showLoading() {
  document.getElementById('loadingContainer').style.display = 'flex';
  document.getElementById('chartsContainer').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loadingContainer').style.display = 'none';
}

function showCharts() {
  document.getElementById('chartsContainer').style.display = 'grid';
}

function hideCharts() {
  document.getElementById('chartsContainer').style.display = 'none';
}

function updateCharts(modelName) {
  const beforeModelData = beforeData.find(item => item.model === modelName);
  const afterModelData = afterData.find(item => item.model === modelName);
  
  if (!beforeModelData || !afterModelData) return;
  
  // Destroy existing charts
  if (beforeChart) beforeChart.destroy();
  if (afterChart) afterChart.destroy();
  
  // Create new charts
  beforeChart = createRadarChart('beforeChart', beforeModelData, 'Before Debiasing', '#ff6b6b');
  afterChart = createRadarChart('afterChart', afterModelData, 'After Debiasing', '#51cf66');
}

function createRadarChart(canvasId, data, label, color) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Bias-Pair Ratio', 'Toxicity', 'Regard-Negative'],
      datasets: [{
        label: label,
        data: [data.biasPairRatio, data.toxicity, data.regardNegative],
        backgroundColor: color + '40',
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: color,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 1.0,
          min: 0,
          ticks: {
            stepSize: 0.2,
            callback: function(value) {
              return value.toFixed(1);
            }
          },
          pointLabels: {
            font: {
              size: 13,
              weight: '500'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 13,
              weight: '500'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed.r.toFixed(3);
            }
          }
        }
      }
    }
  });
}

function copyBibTeX() {
  const bibtexCode = document.getElementById('bibtex-code').textContent;
  navigator.clipboard.writeText(bibtexCode).then(() => {
    const copyBtn = document.querySelector('.copy-bibtex-btn .copy-text');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}