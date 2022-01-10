import express from 'express';
import { parseBmiArgumentsRequest,calculateBmi } from './bmiCalculator';
import {ExerciseValues, AverageValues ,validateExerciseArguments,calculateExercises} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello',(_req,res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi',(req,res) => {
    const inputHeight = req.query.height as string;
    const inputWeight = req.query.weight as string;

    if(!inputHeight || !inputWeight){
        res.status(400);
        res.send({error: 'missing parameter height or weight'});
    }else{
        try{
            const {heightCm,weightKg} = parseBmiArgumentsRequest(inputHeight,inputWeight);
            const bmi:string = calculateBmi(heightCm,weightKg);
            res.status(200);
            res.send({
                weight: weightKg,
                height: heightCm,
                bmi: bmi
            });
        }catch(e){
            res.status(400);
            res.send({error:e.message});
        }
    }
});

app.post('/exercises',(req,res) => {
    const inputDailyExercises  = req.body.daily_exercises as Array<number>;
    const inputTarget = req.body.target as number;

    if(!inputDailyExercises || !inputTarget){
        res.status(400);
        res.send({error: 'parameters missing'});
    }else{
        const input :ExerciseValues = {
            dailyExerciseHours: inputDailyExercises,
            target: inputTarget,
        };

        try{
            validateExerciseArguments(input);
            const averageValues : AverageValues = calculateExercises(input.target,input.dailyExerciseHours);
            res.status(200);
            res.send(averageValues);
        }catch(e){
            res.status(400);
            res.send({error:e.message});
        }
    }
    
});


const PORT = 3002;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});