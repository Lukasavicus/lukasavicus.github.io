const fs = require('fs');
const examples = require('./spot-examples.json');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
module.exports = lang => {
  const intro = lang === 'pt' ? 'Exemplos adaptados da implementação disponível do Spot. Mantêm os mecanismos descritos, com nomes e interfaces simplificados para leitura. Não incluem conexão corporativa, configuração ou dados de clientes.' : 'Examples adapted from the available Spot implementation. They retain the mechanisms described, with names and interfaces simplified for readability. They contain no corporate connection, configuration or client data.';
  return '<p>' + intro + '</p>' + examples.map(e => `<section class="code-example" aria-labelledby="code-${e.id}"><h3 id="code-${e.id}">${esc(e[lang])}</h3><p class="code-origin">${esc(e['kind_' + lang])}</p><pre tabindex="0" aria-label="Python: ${esc(e[lang])}"><code class="language-python">${esc(e.code)}</code></pre><p>${esc(e['text_' + lang])}</p></section>`).join('\n');
};
