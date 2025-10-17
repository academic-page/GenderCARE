// Data from CSV files
const beforeData = [
    {model: "GPT-3.5 Turbo", params: "175B", biasPairRatio: 0.89, toxicity: 0.23, regardNegative: 0.45},
    {model: "GPT-4", params: "Unknown", biasPairRatio: 0.76, toxicity: 0.18, regardNegative: 0.38},
    {model: "LLaMA-7B", params: "7B", biasPairRatio: 0.92, toxicity: 0.31, regardNegative: 0.52},
    {model: "LLaMA-13B", params: "13B", biasPairRatio: 0.88, toxicity: 0.28, regardNegative: 0.48},
    {model: "LLaMA-2-7B", params: "7B", biasPairRatio: 0.87, toxicity: 0.26, regardNegative: 0.47},
    {model: "LLaMA-2-13B", params: "13B", biasPairRatio: 0.83, toxicity: 0.24, regardNegative: 0.43},
    {model: "Vicuna-7B", params: "7B", biasPairRatio: 0.91, toxicity: 0.29, regardNegative: 0.51},
    {model: "Vicuna-13B", params: "13B", biasPairRatio: 0.86, toxicity: 0.25, regardNegative: 0.46},
    {model: "Alpaca-7B", params: "7B", biasPairRatio: 0.94, toxicity: 0.33, regardNegative: 0.54},
    {model: "ChatGLM-6B", params: "6B", biasPairRatio: 0.85, toxicity: 0.27, regardNegative: 0.44},
    {model: "Baichuan-7B", params: "7B", biasPairRatio: 0.90, toxicity: 0.30, regardNegative: 0.50},
    {model: "Baichuan-13B", params: "13B", biasPairRatio: 0.84, toxicity: 0.26, regardNegative: 0.45},
    {model: "InternLM-7B", params: "7B", biasPairRatio: 0.88, toxicity: 0.28, regardNegative: 0.49},
    {model: "Qwen-7B", params: "7B", biasPairRatio: 0.87, toxicity: 0.27, regardNegative: 0.48}
  ];
  
  const afterData = [
    {model: "GPT-3.5 Turbo", params: "175B", biasPairRatio: 0.12, toxicity: 0.08, regardNegative: 0.15},
    {model: "GPT-4", params: "Unknown", biasPairRatio: 0.09, toxicity: 0.06, regardNegative: 0.11},
    {model: "LLaMA-7B", params: "7B", biasPairRatio: 0.18, toxicity: 0.11, regardNegative: 0.21},
    {model: "LLaMA-13B", params: "13B", biasPairRatio: 0.14, toxicity: 0.09, regardNegative: 0.17},
    {model: "LLaMA-2-7B", params: "7B", biasPairRatio: 0.16, toxicity: 0.10, regardNegative: 0.19},
    {model: "LLaMA-2-13B", params: "13B", biasPairRatio: 0.13, toxicity: 0.08, regardNegative: 0.16},
    {model: "Vicuna-7B", params: "7B", biasPairRatio: 0.17, toxicity: 0.10, regardNegative: 0.20},
    {model: "Vicuna-13B", params: "13B", biasPairRatio: 0.15, toxicity: 0.09, regardNegative: 0.18},
    {model: "Alpaca-7B", params: "7B", biasPairRatio: 0.19, toxicity: 0.12, regardNegative: 0.22},
    {model: "ChatGLM-6B", params: "6B", biasPairRatio: 0.14, toxicity: 0.09, regardNegative: 0.17},
    {model: "Baichuan-7B", params: "7B", biasPairRatio: 0.17, toxicity: 0.11, regardNegative: 0.20},
    {model: "Baichuan-13B", params: "13B", biasPairRatio: 0.13, toxicity: 0.09, regardNegative: 0.16},
    {model: "InternLM-7B", params: "7B", biasPairRatio: 0.15, toxicity: 0.10, regardNegative: 0.18},
    {model: "Qwen-7B", params: "7B", biasPairRatio: 0.14, toxicity: 0.09, regardNegative: 0.17}
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
        updateCharts(selectedModel);
        document.getElementById('chartsContainer').style.display = 'grid';
      } else {
        document.getElementById('chartsContainer').style.display = 'none';
      }
    });
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