exports.handler = async function(event, context) {
  // Apenas aceita requisições do tipo POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Metodo nao permitido' };
  }

  try {
    const payload = JSON.parse(event.body);

    // O servidor do Netlify faz o envio para a Utmify (Livre de bloqueios de CORS do navegador)
    const response = await fetch('https://api.utmify.com.br/api-credentials/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': 'ADBAMVq173xgWxDoYzBkl2JxXs4b34gpXqQ0' // Seu token protegido no servidor!
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
