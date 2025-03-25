// app.js (обновленный)
let progressChart;

function createProgressChart(calories) {
  const ctx = document.getElementById('progressChart').getContext('2d');

  if (progressChart) {
    progressChart.destroy();
  }

  progressChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [{
        label: 'Calories Consumed',
        data: [calories, calories + 50, calories + 100, calories + 150, calories + 200],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Включаем создание графика после получения рекомендаций
function displayRecommendations(recommendations) {
  document.getElementById('workout').textContent = `Workout: ${recommendations.workout}`;
  document.getElementById('diet').textContent = `Diet: ${recommendations.diet}`;
  document.getElementById('trainingType').textContent = `Training Type: ${recommendations.trainingType}`;
  document.getElementById('dailyCalories').textContent = `Recommended Daily Calories: ${recommendations.dailyCalories} kcal`;

  createProgressChart(recommendations.dailyCalories); // Создаем график

  document.getElementById('recommendations').style.display = 'block';
}
