interface BmiValues{
    heightCm: number;
    weightKg: number;
}

export const parseBmiArgumentsRequest = (
    heightCm: string,
    weightKg: string
): BmiValues => {
    if (!isNaN(Number(heightCm)) && !isNaN(Number(weightKg))){
        return {
            heightCm: Number(heightCm),
            weightKg: Number(weightKg)
        };
    }else{
        throw new Error('malformatted height or weight');   
    }
};

const parseBmiArguments = (
    args: Array<string>
): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            heightCm: Number(args[2]),
            weightKg: Number(args[3])
        };
    }else{
        throw new Error('Provided values were not numbers!');   
    }
};

export const calculateBmi = (
    heightCm: number,
    weightKg: number
):string => {
    if (heightCm === 0) throw new Error("Height can't be 0");
    const heightM : number = heightCm/100;
    const bmi : number = weightKg / (heightM*heightM);

    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    } else if (bmi >= 16 && bmi < 17) {
        return 'Underweight (Moderate thinness)';
    } else if (bmi >= 17 && bmi <= 18.4) {
        return 'Underweight (Mild thinness)';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi <= 29.9) {
        return 'Overweight (Pre-obese)';
    } else if (bmi >= 30 && bmi <= 34.9) {
        return 'Obese Class I (Moderately obese)';
    } else if (bmi >= 35 && bmi <= 39.9) {
        return 'Obese Class II (Severely obese)';
    } else {
        return 'Obese Class III (Very severely obese)	';
    }
};

try{
    const{heightCm,weightKg} = parseBmiArguments(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
}catch(error: unknown){
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}