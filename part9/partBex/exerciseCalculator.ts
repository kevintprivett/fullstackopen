interface CalculateExercisesResult  {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const validateArg = (arg: string): number => {
  const testValue = Number(arg);
  if (!isNaN(testValue)) {
    return testValue;
  } else {
    throw new Error('One of the arguments was not a number!');
  }
};

export const calculateExercises = (dailyExerciseHours: number[],
                            targetAmount: number): CalculateExercisesResult => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.reduce(
    (acc, cur) => acc + (cur > 0 ? 1 : 0),
    0
  );
  const average =  (
    dailyExerciseHours.reduce(
      (acc, cur) => acc + cur,
      0
    ) / periodLength
  );
  const success = (average >= targetAmount);
  let rating = -1;
  let ratingDescription = '';
  if (average === 0 || targetAmount / average >= 2) {
    rating = 1;
    ratingDescription = 'You need to focus on making improvements.';
  }
  else if (targetAmount / average >= 1) {
    rating = 2;
    ratingDescription = 'Not bad but could be better.';
  }
  else {
    rating = 3;
    ratingDescription = 'Great job! Keep up the good work.';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: average
  };
};

if (require.main === module) {
  try {
    const targetAmount = validateArg(process.argv[2]);
    const dailyExerciseHours = [];

    for (let i = 3; i < process.argv.length; ++i) {
      dailyExerciseHours.push(validateArg(process.argv[i]));
    }

    console.log(calculateExercises(dailyExerciseHours, targetAmount));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
