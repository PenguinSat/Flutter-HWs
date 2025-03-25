// app.js
document.getElementById('userForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const bodyType = document.getElementById('bodyType').value;

  const response = await fetch('http://localhost:3000/recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      weight: parseFloat(weight),
      height: parseFloat(height),
      age: parseInt(age),
      gender: gender,
      bodyType: bodyType
    }),
  });

  const recommendations = await response.json();
  displayRecommendations(recommendations);
});

function displayRecommendations(recommendations) {
  document.getElementById('workout').textContent = `Workout: ${recommendations.workout}`;
  document.getElementById('diet').textContent = `Diet: ${recommendations.diet}`;
  document.getElementById('trainingType').textContent = `Training Type: ${recommendations.trainingType}`;
  document.getElementById('dailyCalories').textContent = `Recommended Daily Calories: ${recommendations.dailyCalories} kcal`;

  document.getElementById('recommendations').style.display = 'block';
}
