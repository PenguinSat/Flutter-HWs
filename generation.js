// Рекомендации для пользователя
app.post('/recommendations', (req, res) => {
  const { weight, height, age, gender, bodyType } = req.body;

  // Простая логика для примера. Тут можно добавить более сложные алгоритмы.
  const bmi = calculateBMI(weight, height);
  let workout = '';
  let diet = '';

  if (bmi < 18.5) {
    workout = 'Focus on strength training to build muscle mass.';
    diet = 'Increase caloric intake with protein-rich foods.';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    workout = 'Maintain your fitness with a mix of cardio and strength training.';
    diet = 'Maintain a balanced diet with moderate calorie intake.';
  } else {
    workout = 'Cardio exercises like running or cycling will help burn fat.';
    diet = 'Focus on a calorie deficit diet, reducing fats and carbs.';
  }

  const recommendations = {
    workout,
    diet,
  };

  res.status(200).json(recommendations);
});

// Функция для расчета BMI
function calculateBMI(weight, height) {
  const heightInMeters = height / 100; // Convert height to meters
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}
