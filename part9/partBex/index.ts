import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || isNaN(Number(req.query.height)) ||
      !req.query.weight || isNaN(Number(req.query.weight))) {
    res.send({
      error: 'Malformed parameters'
    });
  }
  else {
    res.send({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: calculateBmi(
        Number(req.query.height),
        Number(req.query.weight)
      )
    });
  }
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !Array.isArray(req.body.daily_exercises) ||
      !req.body.daily_exercises.every((elem: number) => !isNaN(Number(elem))) ||
      !req.body.target || isNaN(Number(req.body.target))) {
    res.send({
      error: 'Malformed parameters'
    });
  }
  else {
    res.send(
      calculateExercises(
        req.body.daily_exercises,
        req.body.target
      )
    );
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
