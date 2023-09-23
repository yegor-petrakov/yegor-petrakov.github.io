const BELT_TEETH_TYPES = {
    "T5": 6,
    "T10": 3,
}

const proceedButton = document.getElementById('proceed_button');
const copyToClipboardButton = document.getElementById('copyToClipboard_button');
// const resetButton = document.getElementById('reset_button');

const display = document.getElementById('display');


proceedButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const beltLength = document.getElementById('belt_length_input').value;
    const perforationStep = document.getElementById('perf_step_input').value;
    const gCode = document.getElementById('g_code_input').value;
    const beltTeethType = document.getElementById('belt_teeth_input').value;

    display.innerHTML = "";

    if (beltLength !== "" & perforationStep !== "" & gCode !== "") {
        if (beltLength > perforationStep) {
            generateOutput(beltLength, perforationStep, gCode, BELT_TEETH_TYPES[beltTeethType]);
        }
    }

});

// resetButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     reset(beltLength, perforationStep, gCode, beltTeethType);
// });

copyToClipboardButton.addEventListener('click', (e) => {
    const displayOutput = document.getElementById('display_output');
    const textArea = document.createElement('textarea');
    textArea.textContent = displayOutput.innerText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
});


function generateOutput(beltLength, perforationStep, gCode, beltTeethType) {
    const rotationAngleStep = perforationStep * beltTeethType;
    const rotationAngleMax = beltLength / perforationStep * rotationAngleStep;

    const gCodeOutput = document.createElement('code');
    gCodeOutput.classList.add('text-green-400', 'whitespace-pre-line', 'overflow-y-scroll', 'display_output');
    gCodeOutput.setAttribute('id', 'display_output');

    const displayParams = document.createElement('div');
    displayParams.classList.add('flex', 'h-fit', 'gap-2');

    const aMinParam = document.createElement('div');
    aMinParam.classList.add('px-2', 'py-1', 'text-green-950', 'bg-green-400', 'rounded-md');
    aMinParam.innerHTML = `А мин = <b>${rotationAngleStep}</b>`;
    
    const aStepParam = document.createElement('div');
    aStepParam.classList.add('px-2', 'py-1', 'text-green-950', 'bg-green-400', 'rounded-md');
    aStepParam.innerHTML = `A шаг = <b>${rotationAngleStep}</b>`;

    const aMaxParam = document.createElement('div');
    aMaxParam.classList.add('px-2', 'py-1', 'text-green-950', 'bg-green-400', 'rounded-md');
    aMaxParam.innerHTML = `A макс = <b>${rotationAngleMax}</b>`;

    displayParams.append(aStepParam, aMinParam, aMaxParam);
    
    let output = "";

    for (let a = rotationAngleStep; a <= rotationAngleMax + 1; a += rotationAngleStep) {
        output += "\n" + gCode + `\nA-${a}`;
    }

    gCodeOutput.innerText = output;
    display.append(displayParams);
    display.append(gCodeOutput);
}
