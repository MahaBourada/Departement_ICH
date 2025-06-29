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
      console.error("Erreur lors de l'envoi à l'admin:", err);
      return res
        .status(500)
        .json({ error: "Échec de l'envoi de l'email à l'administration." });
    }

    // Then send confirmation to the user
    transporter.sendMail(confirmationToUser, (err2, info2) => {
      if (err2) {
        console.error("Erreur lors de l'envoi à l'utilisateur:", err2);
        return res.status(500).json({
          error:
            "Email envoyé à l'admin, mais échec de la confirmation à l'utilisateur.",
        });
      }

      return res.status(200).json({
        message:
          "Email envoyé avec succès et confirmation envoyée à l'utilisateur.",
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

Description de la collaboration : ${description}

${disponibilites && `Disponibilités : ${disponibilites}`}

${site && site !== "undefined" ? `Lien : ${site}` : ""}`,

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
      console.error("Erreur lors de l'envoi à l'admin:", err);
      return res
        .status(500)
        .json({ error: "Échec de l'envoi de l'email à l'administration." });
    }

    // Then send confirmation to the user
    transporter.sendMail(confirmationToUser, (err2, info2) => {
      if (err2) {
        console.error("Erreur lors de l'envoi à l'utilisateur:", err2);
        return res.status(500).json({
          error:
            "Email envoyé à l'admin, mais échec de la confirmation à l'utilisateur.",
        });
      }

      return res.status(200).json({
        message:
          "Email envoyé avec succès et confirmation envoyée à l'utilisateur.",
      });
    });
  });
};
