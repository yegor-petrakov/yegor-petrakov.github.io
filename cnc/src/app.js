document.addEventListener('DOMContentLoaded', () => {
  // Element selectors
  const formMachineOne = document.getElementById('calc-form-machine-one');
  const formMachineTwo = document.getElementById('calc-form-machine-two');
  const outputContainer = document.getElementById('output');
  const copyButton = document.getElementById('copy-btn');
  const tabBtn1 = document.getElementById("tab-btn-1");
  const tabBtn2 = document.getElementById("tab-btn-2");
  const tab1 = document.getElementById("tab-1");
  const tab2 = document.getElementById("tab-2");

  // Tab switching
  function switchTab(activeTab, inactiveTab, activeBtn, inactiveBtn) {
    activeTab.classList.remove("hidden");
    inactiveTab.classList.add("hidden");
    activeBtn.classList.add("bg-zinc-600");
    inactiveBtn.classList.remove("bg-zinc-600");
  }

  tabBtn1.addEventListener("click", () => switchTab(tab1, tab2, tabBtn1, tabBtn2));
  tabBtn2.addEventListener("click", () => switchTab(tab2, tab1, tabBtn2, tabBtn1));
  switchTab(tab1, tab2, tabBtn1, tabBtn2); // Set default tab

  // Utility: Generate output lines
  function generateOutputLines({ startAngle, step, endAngle, gcode, prefix }) {
    const lines = [];
    for (let angle = startAngle; angle <= endAngle; angle += step) {
      lines.push(`${gcode}<br />${prefix}${angle}`);
    }
    return lines;
  }

  // Handler: Machine One form
  formMachineOne.addEventListener('submit', (event) => {
    event.preventDefault();
    const length = parseFloat(formMachineOne.length.value);
    const pitch = parseFloat(formMachineOne.pitch.value);
    const angleValue = parseFloat(formMachineOne.teethType.value);
    const gcode = formMachineOne.gcode.value;
    const prefix = formMachineOne.prefixMachineOne.value;

    const angularStep = pitch * angleValue;
    const totalAngle = (length / pitch) * angularStep;

    const lines = generateOutputLines({
      startAngle: angularStep,
      step: angularStep,
      endAngle: totalAngle,
      gcode,
      prefix
    });

    renderOutput(lines);
  });

  // Handler: Machine Two form
  formMachineTwo.addEventListener('submit', (event) => {
    event.preventDefault();
    const length = parseFloat(formMachineTwo.lengthMachineTwo.value);
    const pitch = parseFloat(formMachineTwo.pitchMachineTwo.value);
    const maxAngle = parseFloat(formMachineTwo.angleMaxValue.value);
    const gcode = formMachineTwo.gcodeMachineTwo.value;
    const prefix = formMachineTwo.prefixMachineTwo.value;

    const angularStep = maxAngle / (length / pitch);

    const lines = generateOutputLines({
      startAngle: angularStep,
      step: angularStep,
      endAngle: maxAngle,
      gcode,
      prefix
    });

    renderOutput(lines);
  });

  // Clipboard copy functionality
  copyButton.addEventListener('click', () => {
    const text = outputContainer.innerText;
    if (!text.trim()) return;
  
    navigator.clipboard.writeText(text)
      .then(() => {
        copyButton.textContent = 'Скопировано!';
  
        setTimeout(() => {
          copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
            <span>Копировать</span>
          `;
        }, 1500);
      })
      .catch((err) => {
        alert('Не удалось скопировать текст.');
        console.error(err);
      });
  });

  // Output renderer
  function renderOutput(lines) {
    outputContainer.innerHTML = lines.map(line => `<div>${line}</div>`).join('');
  }
});
