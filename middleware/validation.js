import { body, validationResult } from "express-validator";
import { isValidPhoneNumber } from "libphonenumber-js";

export const validateContactForm = [
  body("firstName").notEmpty().withMessage("Le prénom est requis"),
  body("lastName").notEmpty().withMessage("Le nom est requis"),
  body("email")
    .notEmpty()
    .withMessage("L'email est requis")
    .bail()
    .isEmail()
    .withMessage("Email invalide"),
  body("subject").notEmpty().withMessage("L'objet est requis"),
  body("bodyMessage").notEmpty().withMessage("Le message est requis"),
];

export const validateCollabForm = [
  body("prenom").notEmpty().withMessage("Le prénom est requis"),
  body("nom").notEmpty().withMessage("Le nom est requis"),
  body("email")
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("L'email est invalide"),
  body("telephone")
    .notEmpty()
    .withMessage("Le numéro de téléphone est requis")
    .custom((value) => {
      if (!isValidPhoneNumber(value)) {
        throw new Error("Le numéro de téléphone est invalide");
      }
      return true;
    }),
  body("organisation").notEmpty().withMessage("L'organisation est requise"),
  body("fonction").notEmpty().withMessage("La fonction est requise"),
  body("objet").notEmpty().withMessage("L'objet de collaboration est requis"),
  body("site")
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true })
    .withMessage("Site invalide"),
];

export const validateAdmin = [
  body("firstname").notEmpty().withMessage("Le prénom est requis"),
  body("lastname").notEmpty().withMessage("Le nom est requis"),
  body("email").notEmpty().withMessage("L'email est requis"),
  body("email").isEmail().withMessage("Email invalide"),
];

export const validateNews = [
  body("titre_fr").notEmpty().withMessage("Le titre en français est requis"),
  body("titre_en").notEmpty().withMessage("Le titre en anglais est requis"),
  body("contenu_fr").notEmpty().withMessage("Le texte en français est requis"),
  body("contenu_en").notEmpty().withMessage("Le texte en anglais est requis"),
  body("lien")
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true })
    .withMessage("Lien invalide"),

  (req, res, next) => {
    const { image, alt_fr, alt_en } = req.body;

    const errors = validationResult(req);
    let mappedErrors = errors.array();

    if (image) {
      if (!alt_fr || alt_fr.trim() === "") {
        mappedErrors.push({
          param: "alt_fr",
          msg: "L'alt en français est requis",
        });
      }
      if (!alt_en || alt_en.trim() === "") {
        mappedErrors.push({
          param: "alt_en",
          msg: "L'alt en anglais est requis",
        });
      }
    }

    if (mappedErrors.length > 0) {
      return res.status(400).json({ errors: mappedErrors });
    }

    next();
  },
];

export const validateMember = [
  body("prenom").notEmpty().withMessage("Le prénom est requis"),
  body("nom").notEmpty().withMessage("Le nom est requis"),
  body("titre").notEmpty().withMessage("Le titre est requis"),

  // Custom validator logic
  (req, res, next) => {
    const {
      titre,
      fonction_fr,
      fonction_en,
      section_fr,
      section_en,
      propos_fr,
      propos_en,
    } = req.body;

    // Collect built-in validation errors first
    const errors = validationResult(req);
    const mappedErrors = [...errors.array()];

    // If titre is present, both fonction_fr and fonction_en are required
    if (titre === "Directeur du département" || titre === "Enseignant(e)") {
      if (!fonction_fr?.trim()) {
        mappedErrors.push({
          param: "fonction_fr",
          msg: "La fonction en français est requise",
        });
      }
      if (!fonction_en?.trim()) {
        mappedErrors.push({
          param: "fonction_en",
          msg: "La fonction en anglais est requise",
        });
      }
    }

    // If either fonction is present, the other must be present too
    if (fonction_fr && !fonction_en?.trim()) {
      mappedErrors.push({
        param: "fonction_en",
        msg: "La fonction en anglais est requise",
      });
    }
    if (fonction_en && !fonction_fr?.trim()) {
      mappedErrors.push({
        param: "fonction_fr",
        msg: "La fonction en français est requise",
      });
    }

    // If either section is present, the other must be present too
    if (section_fr && !section_en?.trim()) {
      mappedErrors.push({
        param: "section_en",
        msg: "La section en anglais est requise",
      });
    }
    if (section_en && !section_fr?.trim()) {
      mappedErrors.push({
        param: "section_fr",
        msg: "La section en français est requise",
      });
    }

    // If either propos is present, the other must be present too
    if (propos_fr && !propos_en?.trim()) {
      mappedErrors.push({
        param: "propos_en",
        msg: "Le propos en anglais est requis",
      });
    }
    if (propos_en && !propos_fr?.trim()) {
      mappedErrors.push({
        param: "propos_fr",
        msg: "Le propos en français est requis",
      });
    }

    // Return errors if any
    if (mappedErrors.length > 0) {
      return res.status(400).json({ errors: mappedErrors });
    }

    next();
  },
];

export const validateProject = [
  body("titre").notEmpty().withMessage("Le titre du projet est requis"),
  body("annee").notEmpty().withMessage("L'année est requise"),
  body("objectif_fr")
    .notEmpty()
    .withMessage("L'objectif en français est requis"),
  body("objectif_en")
    .notEmpty()
    .withMessage("L'objectif en anglais est requis"),

  body("membres")
    .isArray({ min: 1 })
    .withMessage("Au moins un membre est requis"),
  body("membres.*.prenom")
    .notEmpty()
    .withMessage("Le prénom de chaque membre est requis"),
  body("membres.*.nom")
    .notEmpty()
    .withMessage("Le nom de chaque membre est requis"),

  body("images").optional().isArray(),
  body("images.*").custom((image, { path }) => {
    if (image.path && image.path.trim() !== "") {
      if (!image.alt_fr || image.alt_fr.trim() === "") {
        throw new Error(
          "Le texte alternatif en français est requis pour chaque image"
        );
      }
      if (!image.alt_en || image.alt_en.trim() === "") {
        throw new Error(
          "Le texte alternatif en anglais est requis pour chaque image"
        );
      }
    }
    return true;
  }),
];

export const validateCollab = [
  body("nom").notEmpty().withMessage("Le nom de la collaboration est requis"),
  body("type").notEmpty().withMessage("Le type de la collaboration est requis"),
  body("categorie")
    .notEmpty()
    .withMessage("La catégorie de la collaboration est requise"),

  (req, res, next) => {
    const { description_fr, description_en } = req.body;

    // Collect built-in validation errors first
    const errors = validationResult(req);
    const mappedErrors = [...errors.array()];

    // If either descriptions is present, the other must be present too
    if (description_fr && !description_en?.trim()) {
      mappedErrors.push({
        param: "description_en",
        msg: "La description en anglais est requise",
      });
    }
    if (description_en && !description_fr?.trim()) {
      mappedErrors.push({
        param: "description_fr",
        msg: "La description en français est requise",
      });
    }

    // Return errors if any
    if (mappedErrors.length > 0) {
      return res.status(400).json({ errors: mappedErrors });
    }

    next();
  },
];

export const validatePrix = [
  body("nom").notEmpty().withMessage("Le nom du prix est requis"),
  body("organisation")
    .notEmpty()
    .withMessage("Le nom de l'organisation est requis"),
  body("projet").notEmpty().withMessage("Le nom du projet est requis"),
  body("annee").notEmpty().withMessage("L'année est requise"),
  body("etudiants")
    .notEmpty()
    .withMessage("Les étudiants participants sont requis"),
  body("lien")
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true })
    .withMessage("Lien invalide"),

  (req, res, next) => {
    const { description_fr, description_en, image, alt_fr, alt_en } = req.body;

    // Collect built-in validation errors first
    const errors = validationResult(req);
    const mappedErrors = [...errors.array()];

    // If either descriptions is present, the other must be present too
    if (description_fr && !description_en?.trim()) {
      mappedErrors.push({
        param: "description_en",
        msg: "La description en anglais est requise",
      });
    }
    if (description_en && !description_fr?.trim()) {
      mappedErrors.push({
        param: "description_fr",
        msg: "La description en français est requise",
      });
    }

    if (image) {
      if (!alt_fr || alt_fr.trim() === "") {
        mappedErrors.push({
          param: "alt_fr",
          msg: "L'alt en français est requis",
        });
      }
      if (!alt_en || alt_en.trim() === "") {
        mappedErrors.push({
          param: "alt_en",
          msg: "L'alt en anglais est requis",
        });
      }
    }

    // Return errors if any
    if (mappedErrors.length > 0) {
      return res.status(400).json({ errors: mappedErrors });
    }

    next();
  },
];
