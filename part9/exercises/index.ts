import express from 'express';
import { parseBmiArgumentsRequest,calculateBmi } from './bmiCalculator';

const app = express();

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
})


const PORT = 3002;

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});