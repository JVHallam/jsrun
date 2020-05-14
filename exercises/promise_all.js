//================= Exercise Space =========================

function resolveWhenAllFinish( ...args ){
}

//================= /Exercise Space =========================

//================= Documentation Space =====================
/*
# Promise all 

Create a function that :
* takes any number of promises
* returns all the values from all the promises as an array
*/
//================= /Documentation Space ====================

//==================== Testing Space  =======================

function resolveAfterMilliseconds( time, value ){
    return new Promise(( resolve, reject ) => {
        setTimeout(() => {
            resolve(value);
        }, time );
    });
}

(async function(){
    const finishedExerciseFunction = ( ...args ) => {
        return Promise.all();
    };
    
    const inputs = [
        [ Promise.resolve(1), Promise.resolve(2), Promise.resolve(3) ]
    ]

    const expectedOutputs = [
        Promise.resolve([ 1, 2, 3 ])
    ]

    for( let i = 0; i < inputs.length; ++i ){
        const expectedOutput = expectedOutputs[i];
        const actualOutput = resolveWhenAllFinish( ...inputs[i] );
        console.log("===============");
        console.log( actualOutput );
        console.log( await actualOutput );
        console.log( expectedOutput );
        console.log( await expectedOutput );
        console.log("===============");
    }
})();

//==================== /Testing Space =======================
