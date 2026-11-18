(() => {
  const nameInput = document.getElementById('client-name');
  const neighborhoodInput = document.getElementById('client-neighborhood');
  const phoneInput = document.getElementById('whatsapp-phone');
  const periodButtons = document.querySelectorAll('.period-btn');
  const previewBox = document.getElementById('message-preview');
  const form = document.getElementById('model-booking-form');

  let selectedPeriod = 'Manhã';

  function buildMessage() {
    const name = (nameInput.value || '').trim() || '[Seu nome]';
    const neighborhood = (neighborhoodInput.value || '').trim() || '[Seu bairro]';
    return `Oi Yasmin! Tudo bem? Meu nome é ${name} (bairro ${neighborhood}). Vi a seleção das 6 modelos de Design de Sobrancelhas pelo valor simbólico de R$ 30 (custo de deslocamento e material) e gostaria de reservar uma vaga! Tenho preferência pelo período da ${selectedPeriod.toLowerCase()}.`;
  }

  function updatePreview() {
    if (previewBox) {
      previewBox.textContent = `Mensagem pronta: “${buildMessage()}”`;
    }
  }

  periodButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      periodButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPeriod = btn.dataset.period || 'Manhã';
      updatePreview();
    });
  });

  [nameInput, neighborhoodInput].forEach((el) => {
    if (el) el.addEventListener('input', updatePreview);
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = buildMessage();
      const rawDigits = ((phoneInput && phoneInput.value) || '').replace(/\D/g, '');
      const normalized = rawDigits
        ? (rawDigits.startsWith('55') ? rawDigits : `55${rawDigits}`)
        : '';
      const waUrl = normalized
        ? `https://wa.me/${normalized}?text=${encodeURIComponent(msg)}`
        : `https://wa.me/?text=${encodeURIComponent(msg)}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).catch(() => {});
      }
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Copy HEX codes when clicking Branding Kit swatches
  document.querySelectorAll('.swatch-card').forEach((card) => {
    card.addEventListener('click', () => {
      const hex = card.dataset.hex;
      const hexLabel = card.querySelector('.swatch-hex');
      if (!hex || !hexLabel) return;
      const original = hexLabel.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(hex).catch(() => {});
      }
      hexLabel.textContent = `${hex} • Copiado!`;
      setTimeout(() => {
        hexLabel.textContent = original;
      }, 1600);
    });
  });

  updatePreview();
})();
