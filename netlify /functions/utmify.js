exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Metodo nao permitido' };
  }

  try {
    const payload = JSON.parse(event.body);

    const response = await fetch('https://api.utmify.com.br/api-credentials/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': 'ZtYj7fZ1Zj1QsCaWh4BphViDxNgRHrTa2Ohm' // <- NOVO TOKEN ATUALIZADO AQUI
      },
      body: JSON.stringify(payload)
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno no servidor do Netlify' })
    };
  }
};
