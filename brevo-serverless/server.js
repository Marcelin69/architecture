const Brevo = require('sib-api-v3-sdk');

exports.handler = async (event) => {
  // Initialiser le client avec la clé API
  const defaultClient = Brevo.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY; // stockée dans les variables d'env

  const apiInstance = new Brevo.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email: "destinataire@example.com", name: "Destinataire" }],
    sender: { email: "tonemail@domaine.com", name: "TonNom" },
    subject: "Hello from Serverless Brevo",
    htmlContent: "<html><body><h1>Bonjour depuis Lambda !</h1></body></html>",
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email envoyé", data: response }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur", error: error.message }),
    };
  }
};
