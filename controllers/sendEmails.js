import nodemailer from "nodemailer";

export const sendEmailContact = (req, res) => {
  const { email, subject, firstName, lastName, bodyMessage } = req.body;

  // For the mail ticket that the user will receive to confirm that his e-mail was sent successfully
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Département ICH - ${subject}`,
    text: `E-mail : ${email}
Émetteur : ${firstName} ${lastName.toUpperCase()}

Message : ${bodyMessage}`,
  };

  const confirmationToUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation de réception de votre message",
    text: `Bonjour ${firstName} ${lastName.toUpperCase()},

Nous avons bien reçu votre message concernant "${subject}" et vous répondrons dans les plus brefs délais.

Voici un résumé de votre message :
------------------------
${bodyMessage}
------------------------

Le département Ingénierie - Cognition - Handicap.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({
        message:
          "Erreur lors de l'envoi à l'administration. Veuillez réessayer plus tard.",
        error: err.message,
      });
    }

    // Then send confirmation to the user
    transporter.sendMail(confirmationToUser, (err2, info2) => {
      if (err2) {
        return res.status(500).json({
          message:
            "Votre message a bien été transmis à l'administration, mais la confirmation n'a pas pu vous être envoyée.",
          error: err2.message,
        });
      }

      return res.status(200).json({
        message: "Email et confirmation envoyés avec succès",
      });
    });
  });
};

export const sendRequestCollab = (req, res) => {
  const {
    prenom,
    nom,
    email,
    telephone,
    organisation,
    fonction,
    objet,
    description,
    site,
    disponibilites,
  } = req.body;
  const fichier = req.file;

  // For the mail ticket that the user will receive to confirm that his e-mail was sent successfully
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Département ICH - ${objet}`,
    text: `Émetteur : ${prenom} ${nom.toUpperCase()}
E-mail : ${email}
Téléphone : ${telephone}
Organisation : ${organisation}
Fonction / Rôle : ${fonction}

${description && `Description de la collaboration : ${description}`}

${disponibilites && `Disponibilités : ${disponibilites}`}

${site && `Lien : ${site}`}`,

    attachments: fichier
      ? [
          {
            filename: fichier.originalname,
            path: fichier.path,
            contentType: fichier.mimetype,
          },
        ]
      : [],
  };

  const confirmationToUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation de réception de votre message",
    text: `Bonjour ${prenom} ${nom.toUpperCase()},

Nous avons bien reçu votre message concernant la collaboration sur "${objet}" et vous répondrons dans les plus brefs délais.

Voici un résumé de votre message :
------------------------
${description}
------------------------

Le département Ingénierie - Cognition - Handicap.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({
        message:
          "Erreur lors de l'envoi à l'administration. Veuillez réessayer plus tard.",
        error: err.message,
      });
    }

    // Then send confirmation to the user
    transporter.sendMail(confirmationToUser, (err2, info2) => {
      if (err2) {
        return res.status(500).json({
          message:
            "Votre proposition a bien été transmise à l'administration, mais la confirmation n'a pas pu vous être envoyée.",
          error: err2.message,
        });
      }

      return res.status(200).json({
        message: "Proposition et confirmation envoyés avec succès",
      });
    });
  });
};
