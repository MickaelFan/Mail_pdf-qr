// server.js

// Importer les modules nécessaires
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

// Initialiser l'application express
const app = express();

// Middleware pour analyser le corps de la requête en JSON
app.use(bodyParser.json({ limit: '10mb' })); // Augmenter la limite de taille pour les fichiers Base64

// Servir les fichiers statiques à partir du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Assurez-vous que le fichier HTML est dans le dossier 'public'
});

// Route pour envoyer l'e-mail avec le PDF en pièce jointe
app.post('/send-email', async (req, res) => {
    const { email, pdfData } = req.body;

    // Configuration de Nodemailer pour envoyer depuis votre Gmail
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ravmickael70@gmail.com',
            pass: 'icub frga mcma ljoz' 
        }
    });

    // Définir les options de l'e-mail
    let mailOptions = {
        from: 'ravmickael70@gmail.com', 
        to: email,
        subject: 'Votre PDF généré',
        text: 'Veuillez trouver votre PDF en pièce jointe.',
        attachments: [
            {
                filename: 'exemple.pdf',
                content: pdfData,
                encoding: 'base64'
            }
        ]
    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'e-mail' });
        }
        res.json({ success: true, message: 'E-mail envoyé avec succès!' });
    });
});

// Démarrer le serveur sur le port 3000
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
