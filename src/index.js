
/*
Inputs
----------------------------------------
*/

const beltLength = document.getElementById('belt_length');
const beltLengthSpan = document.getElementById('belt_length_span');

beltLengthSpan.classList.add(
    "after:content-['*']",
    "after:ml-0.5",
    "after:text-red-500"
);

beltLength.addEventListener('change', (e) => {
    if (e.target.value !== "") {
        beltLengthSpan.classList.remove(
            "after:content-['*']",
            "after:ml-0.5",
            "after:text-red-500"
        );
    } else {
        beltLengthSpan.classList.add(
            "after:content-['*']",
            "after:ml-0.5",
            "after:text-red-500"
        );
    }
});

const perfStep = document.getElementById('perf_step');
const perfStepSpan = document.getElementById('perf_step_span')

perfStepSpan.classList.add(
    "after:content-['*']",
    "after:ml-0.5",
    "after:text-red-500"
);

perfStep.addEventListener('change', (e) => {
    if (e.target.value !== "") {
        perfStepSpan.classList.remove(
            "after:content-['*']",
            "after:ml-0.5",
            "after:text-red-500"
        );
    } else {
        perfStepSpan.classList.add(
            "after:content-['*']",
            "after:ml-0.5",
            "after:text-red-500"
        );
    }
});

const gCode = document.getElementById('g_code');
const gCodeSpan = document.getElementById('g_code_span')

gCodeSpan.classList.add(
    "after:content-['*']",
    "after:ml-0.5",
    "after:text-red-500"
);

gCode.addEventListener('change', (e) => {
    if (e.target.value !== "") {
        gCodeSpan.classList.remove(
            "after:content-['*']",
            "after:ml-0.5",
            "after:text-red-500"
        );
    } else {
        gCodeSpan.classList.add(
            "after:content-['*']",
            "after:ml-0.5",
            "after:text-red-500"
        );
    }
});

const teethSelect = document.getElementById('teeth_select');

const teethType = {
    "T5/T10": 6
}

/*
    ----------------------------------------
*/

/*
Buttons
    ----------------------------------------
*/

const display = document.getElementById('display');
const displayOutput = document.getElementById('display_output');

const outputMeta = document.getElementById('output_meta');

const code = document.createElement('code');
code.setAttribute('id', 'g_code');

const proceedButton = document.getElementById('proceed_button');
const resetButton = document.getElementById('reset_button');
const copyButton = document.getElementById('copy_button');

proceedButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (beltLength.value !== "" & perfStep.value !== "" & gCode.value !== "") {
        if (beltLength.value >= perfStep.value) {
            code.classList.add('text-green-500', "weight-700");

            displayOutput.innerHTML = "";


            const aStep = perfStep.value * teethType[teethSelect.value];
            const aMax = (beltLength.value / perfStep.value) * aStep;

            let output = ``;

            for (let a = aStep; a <= aMax; a += aStep) {
                output += gCode.value + "\n" + `A-${a}` + "\n";
            }

            code.innerText = output;
            displayOutput.append(code);
        }
    }
});

resetButton.addEventListener('click', () => {
    beltLength.value = "";
    perfStep.value = "";
    gCode.value = "";
    displayOutput.innerHTML = "";
});

copyButton.addEventListener('click', (e) => {
    const textArea = document.createElement('textarea');
    textArea.textContent = code.innerText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
});

/*
    ----------------------------------------
*/
