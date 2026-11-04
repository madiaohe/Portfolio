// Portfolio adapter. The imported HMI implementation is left unchanged in vendor/.
(() => {
  const scale = document.getElementById('preview-scale');
  scale.value = 'fit';
  scale.dispatchEvent(new Event('change'));
  document.querySelector('[data-scenario="normal"]').click();
  document.querySelector('[data-page="alarms"]').click();
  document.querySelector('[data-action="reset-alarm"]').click();
  document.querySelector('[data-page="home"]').click();
  document.getElementById('toast').hidden = true;

  function language(value) {
    const lang = value === 'zh' ? 'zh-CN' : 'en';
    if (document.documentElement.lang === lang) return;
    document.querySelector('.language-button').click();
    document
      .querySelector(`[data-language="${value === 'zh' ? '0' : '1'}"]`)
      ?.click();
  }
  const initialLanguage = new URLSearchParams(location.search).get('language');
  language(initialLanguage);
  window.addEventListener(
    'keydown',
    (event) => {
      if (
        event.key === 'Escape' &&
        !document.getElementById('modal-root').hasChildNodes()
      ) {
        window.parent.postMessage(
          { channel: 'portfolio-prototype', type: 'escape' },
          location.origin,
        );
      }
    },
    true,
  );
  window.addEventListener('message', (event) => {
    if (event.source !== window.parent || event.origin !== location.origin)
      return;
    const message = event.data;
    if (message?.channel !== 'portfolio-prototype') return;
    if (message.type === 'initialize') {
      window.parent.postMessage(
        { channel: 'portfolio-prototype', type: 'ready' },
        location.origin,
      );
    }
    if (
      message.type === 'background' &&
      typeof message.value === 'string' &&
      CSS.supports('color', message.value)
    )
      document.documentElement.style.background = message.value;
    if (message.type === 'language') language(message.value);
    if (
      message.type === 'scenario' &&
      ['normal', 'warning', 'fault'].includes(message.value)
    ) {
      document.querySelector(`[data-scenario="${message.value}"]`).click();
    }
  });
})();
