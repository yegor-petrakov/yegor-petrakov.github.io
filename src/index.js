// /*
// Inputs
// ----------------------------------------
// */



const inputContainer = document.querySelector('.input-container');



const beltLength = document.getElementById('belt_length');
const beltLengthSpan = document.getElementById('belt_length_span');

const perfStep = document.getElementById('perf_step');
const perfStepSpan = document.getElementById('perf_step_span')

const gCode = document.getElementById('g_code');
const gCodeSpan = document.getElementById('g_code_span')



// новое
const beltLengthNew = document.getElementById('belt_length-new');
const beltLengthSpanNew = document.getElementById('belt_length_span-new');

const aFinal = document.getElementById('a_final')
const aFinalSpan = document.getElementById('a_final_span');

const perfStepNew = document.getElementById('perf_step-new');
const perfStepSpanNew = document.getElementById('perf_step_span-new')

const gCodeNew = document.getElementById('g_code-new');
const gCodeSpanNew = document.getElementById('g_code_span-new')




const teethSelect = document.getElementById('teeth_select');

const teethType = {
    "T5/T10": 6,
    "H": 6.07559055118
}

const aManual = document.getElementById('a_manual');

const manualIcon = document.getElementById('switch-button-manual-icon');
const backIcon = document.getElementById('switch-button-back-icon');

let isManual = false;

/*
    ----------------------------------------
*/


/*
Buttons
    ----------------------------------------
*/


const switchToMachine1 = document.getElementById('switch_to_m1')
const switchToMachine2 = document.getElementById('switch_to_m2')




const resultWrapper = document.querySelector('.result-wrapper');
const resultContainer = document.querySelector('.result-container');

const result = document.createElement('code');
result.classList.add("result");

const proceedButton = document.getElementById('proceed-button');

const proceedButtonNew = document.getElementById('proceed-button-new');

const resetButton = document.getElementById('reset-button');
const copyButton = document.getElementById('copy-button');
const switchButton = document.getElementById('switch-button');

proceedButton.addEventListener('click', (e) => {
    e.preventDefault();

    const beltLengthValue = parseFloat(beltLength.value);
    const perfStepValue = parseFloat(perfStep.value);
    const aManualValue = parseFloat(aManual.value);

    const metaStep = document.getElementById('meta-step');
    const metaMax = document.getElementById('meta-max');
    const metaCoef = document.getElementById('meta-coef');

    let teethTypeValue = isManual ? aManualValue : teethType[teethSelect.value];

    if (beltLengthValue !== "" & perfStepValue !== "" & gCode.value !== "") {
        if (beltLengthValue >= perfStepValue) {
            result.classList.add('text-green-500', "weight-700", "overflow-y-scroll");

            resultContainer.innerHTML = "";






            

            const aStep = perfStepValue * teethTypeValue;
            const aMax = parseFloat((beltLengthValue / perfStepValue) * aStep);





            let output = ``;
            let a_max = 0;

            setTimeout(() => {
                for (let a = aStep; a <= aMax; a += aStep) {
                    output += gCode.value + "\n" + `A-${a}` + "\n";
                    a_max += aStep;
                }
    
                result.innerText = output;
                resultContainer.append(result);
    
                resultWrapper.classList.add('is-shown');
    
                metaStep.innerHTML = aStep;
                metaMax.innerHTML = a_max;
                metaCoef.innerHTML = teethTypeValue;
            }, 250);







        }
    } else {

    }
});






proceedButtonNew.addEventListener('click', (e) => {
    e.preventDefault();

    const beltLengthValueNew = parseFloat(beltLengthNew.value);
    const aFinalValue = parseFloat(aFinal.value);
    const perfStepValueNew = parseFloat(perfStepNew.value);

    if (beltLengthValueNew !== "" & perfStepValueNew !== "" & gCodeNew.value !== "") {
        if (beltLengthValueNew >= perfStepValueNew) {
            result.classList.add('text-green-500', "weight-700", "overflow-y-scroll");

            resultContainer.innerHTML = "";




            //      a шаг = а конечное / длина ремня
            //      




            const aStep = perfStepValueNew * (aFinalValue / beltLengthValueNew);

            let output = ``;

            setTimeout(() => {
                for (let a = aStep; parseInt(a) <= aFinalValue; a += aStep) {
                    output += gCodeNew.value + "\n" + `A${a}` + "\n";
                }
    
                result.innerText = output;
                resultContainer.append(result);
    
                resultWrapper.classList.add('is-shown');
            }, 250);


        }
    } else {

    }
});









resetButton.addEventListener('click', () => {
    beltLength.value = "";
    perfStep.value = "";
    gCode.value = "";
    result.innerHTML = "";
    aManual.value = "";
});

copyButton.addEventListener('click', (e) => {
    const textArea = document.createElement('textarea');
    textArea.textContent = result.innerText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
});


switchButton.addEventListener('click', () => {

    const teethTypeSpan = document.getElementById('teeth_type_span');

    isManual = !isManual;

    const manualInputSpan = document.createElement('span');
    manualInputSpan.innerHTML = '(для 1 мм)';
    manualInputSpan.classList.add('font-normal', 'text-gray-400');

        
    if (isManual) {
        teethTypeSpan.innerHTML = "Коэффициент А "
        teethTypeSpan.appendChild(manualInputSpan);

        aManual.classList.add('show');
        aManual.classList.remove('hide');
        teethSelect.classList.add('hide');
        teethSelect.classList.remove('show');

        manualIcon.classList.remove('show');
        manualIcon.classList.add('hide');
        backIcon.classList.add('show');
        backIcon.classList.remove('hide');
    } else {
        teethTypeSpan.innerHTML = "";
        teethTypeSpan.innerHTML = "Тип зуба";

        aManual.classList.add('hide');
        aManual.classList.remove('show');
        teethSelect.classList.remove('hide');
        teethSelect.classList.add('show');

        manualIcon.classList.add('show');
        manualIcon.classList.remove('hide');
        backIcon.classList.remove('show');
        backIcon.classList.add('hide');
    }

});



const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', () => {
    resultWrapper.classList.remove('is-shown');
});





const machine1 = document.getElementById("new_machine")
const machine2 = document.getElementById("old_machine")




// switchToMachine1.addEventListener(() => {
//     machine1.classList.add("m1-shown");
//     machine2.classList.remove("m2-shown");

//     machine1.classList.remove("m1-hidden");
//     machine2.classList.add("m2-hidden");
// });

// switchToMachine2.addEventListener(() => {
//     machine2.classList.add("m2-shown");
//     machine1.classList.remove("m1-shown");

//     machine2.classList.remove("m2-hidden");
//     machine1.classList.add("m1-hidden");
// });




/*
    ----------------------------------------
*/

