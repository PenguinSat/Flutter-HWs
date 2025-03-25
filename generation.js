// Рекомендации для пользователя
app.post('/recommendations', (req, res) => {
  const { weight, height, age, gender, bodyType } = req.body;

  // Простая логика для примера. Тут можно добавить более сложные алгоритмы.
  const bmi = calculateBMI(weight, height);
  let workout = '';
  let diet = '';
  let trainingType = '';
  let dailyCalories = 0;

  // Расчет потребностей в калориях для разных целей
  const bmr = calculateBMR(weight, height, age, gender); // Основной обмен веществ

  if (bmi < 18.5) {
    workout = 'Focus on strength training to build muscle mass. Aim for 3-4 strength training sessions per week.';
    trainingType = 'Strength Training';
    diet = 'Increase caloric intake with protein-rich foods. Consider a caloric surplus to promote muscle growth.';
    dailyCalories = bmr + 500;  // Для набора массы
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    workout = 'Maintain your fitness with a mix of cardio and strength training. Aim for 3-4 sessions per week.';
    trainingType = 'Mixed Training (Strength & Cardio)';
    diet = 'Maintain a balanced diet with moderate calorie intake. Focus on nutrient-dense foods.';
    dailyCalories = bmr + 200;  // Для поддержания веса
  } else {
    workout = 'Cardio exercises like running or cycling will help burn fat. Try to do cardio 4-5 times a week.';
    trainingType = 'Cardio Training';
    diet = 'Focus on a calorie deficit diet, reducing fats and carbs. Prioritize protein to maintain muscle mass.';
    dailyCalories = bmr - 500;  // Для потери жира
  }

  const recommendations = {
    workout,
    trainingType,
    diet,
    dailyCalories,  // Рекомендуемое количество калорий в день
  };

  res.status(200).json(recommendations);
});

// Функция для расчета BMI
function calculateBMI(weight, height) {
  const heightInMeters = height / 100; // Convert height to meters
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
}

// Функция для расчета BMR (основной обмен веществ)
function calculateBMR(weight, height, age, gender) {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;  // Формула для мужчин
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;  // Формула для женщин
  }
}
