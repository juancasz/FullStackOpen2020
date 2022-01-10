export interface ExerciseValues {
    target: number;
    dailyExerciseHours: Array<number>;
}

export const validateExerciseArguments = (
    input: ExerciseValues
) => {
    if (isNaN(input.target)){
        throw new Error('invalid target value');
    }

    if (!Array.isArray(input.dailyExerciseHours)){
        throw new Error('invalid exercise hours');
    }

    input.dailyExerciseHours.forEach((dayHours,day) => {
        if (isNaN(Number(dayHours))){
            throw new Error(`Hours reported in day ${day} are not a number`);
        }
    });
};


export const parseExerciseArguments = (
    args: Array<string>
): ExerciseValues => {
    if (args.length < 3){
        throw new Error('Not enough arguments');
    } 

    const exerciseValues = <ExerciseValues>{};

    if (!isNaN(Number(args[2]))){
        exerciseValues.target = Number(args[2]);
    }else{
        throw new Error('Target hours is not a number');  
    }

    exerciseValues.dailyExerciseHours = [] as Array<number>;

    args.slice(3).forEach((dayHours,day) => {
        if (isNaN(Number(dayHours))){
            throw new Error(`Hours reported in day ${day} are not a number`);
        }
        exerciseValues.dailyExerciseHours.push(Number(dayHours));
    });

    return exerciseValues;
};

export interface AverageValues {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
}

export const calculateExercises = (
    target: number,
    dailyExerciseHours: Array<number>
): AverageValues  => {
    const periodLength : number = dailyExerciseHours.length;

    if (periodLength === 0) throw new Error("Not days were reported");

    const trainingDays : number = dailyExerciseHours.filter(hours => hours > 0).length;
    const average:number = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;

    const success:boolean = average >= target ? true : false;

    let rating: number;
    let ratingDescription : string;

    if (average < 0.25*target) {
        rating = 1;
        ratingDescription = 'very bad';
    } else if (average <= target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'very good';
    }
    
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

try{
    const{target,dailyExerciseHours}=parseExerciseArguments(process.argv);
    console.log(calculateExercises(target,dailyExerciseHours));
}catch(error:unknown){
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
