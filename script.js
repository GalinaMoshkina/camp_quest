(function () {
  const kicker = document.getElementById("questKicker");
  const title = document.getElementById("questTitle");
  const text = document.getElementById("questText");
  const status = document.getElementById("questStatus");

  const params = new URLSearchParams(window.location.search);
  const requestedStep = Number(params.get("step"));
  const steps = QUEST_CONFIG.steps;
  const maxStep = steps.length;

  function getProgress() {
    const saved = Number(window.localStorage.getItem(QUEST_CONFIG.storageKey));
    if (!Number.isInteger(saved) || saved < 0) {
      return 0;
    }

    return Math.min(saved, maxStep);
  }

  function setProgress(stepId) {
    const current = getProgress();
    if (stepId > current) {
      window.localStorage.setItem(QUEST_CONFIG.storageKey, String(stepId));
    }
  }

  function renderParagraphs(paragraphs) {
    text.innerHTML = "";
    paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      text.appendChild(p);
    });
  }

  function renderInvalidStep() {
    kicker.textContent = QUEST_CONFIG.title;
    title.textContent = "QR-код не найден";
    renderParagraphs([
      "В ссылке нет номера этапа или он указан неверно.",
      "Проверьте, что QR-код ведет на адрес с параметром вроде ?step=1."
    ]);
    status.textContent = "";
  }

  function renderLocked(stepId, progress) {
    const nextStep = progress + 1;
    kicker.textContent = QUEST_CONFIG.title;
    title.textContent = "Этот след пока закрыт";
    renderParagraphs([
      `Вы нашли QR-код ${stepId}, но сейчас нужен QR-код ${nextStep}.`,
      "Вернитесь к маршруту и найдите предыдущую точку."
    ]);
    status.textContent = `Пройдено: ${progress} из ${maxStep}`;
  }

  function renderStep(step) {
    setProgress(step.id);

    kicker.textContent = `${QUEST_CONFIG.title} · ${step.creature}`;
    title.textContent = step.title;
    renderParagraphs(step.text);
    status.textContent = `Этап ${step.id} из ${maxStep}`;
  }

  if (!Number.isInteger(requestedStep) || requestedStep < 1 || requestedStep > maxStep) {
    renderInvalidStep();
    return;
  }

  const progress = getProgress();
  if (requestedStep > progress + 1) {
    renderLocked(requestedStep, progress);
    return;
  }

  renderStep(steps[requestedStep - 1]);
})();
