function createKolenuUnifiedFormSinglePage() {
  const FORM_VERSION = "1.0";
  const form = FormApp.create("Kolenu Voice Submission v" + FORM_VERSION);

  // Collect verified email for legal record
  form.setCollectEmail(true);

  const requiredClause =
    "I confirm either (a) the melody is traditional/public-domain nusach, or (b) we have permission to submit and use this performance.\n\n" +
    "Kolenu may review submissions and may remove content at its discretion. We may also honor reasonable removal requests.\n\n" +
    "I approve the attribution format described below.";

  form.setDescription(
    "Thank you for lending your voice to Kolenu.\n\n" +
    "Kolenu is a community-supported project helping Jews of all backgrounds learn traditional Hebrew prayer with confidence.\n\n" +
    "This form accepts recordings from both teens (submitted by a parent/guardian) and adults.\n\n" +
    "Learn more: https://www.kolenu.net/contribute.html\n\n" +
    "To submit:\n" +
    "• Upload your audio to your own Google Drive\n" +
    "• Set sharing to 'Anyone with the link can view'\n" +
    "• Paste the link below\n\n" +
    "We are grateful for your contribution to our shared tradition."
  );

  // --- Contributor Type ---
  const contributorTypeItem = form
    .addMultipleChoiceItem()
    .setTitle("I am submitting as:")
    .setRequired(true)
    .setHelpText("Select contributor type to continue to the appropriate consent section.");

  // --- Teen Path ---
  const teenPage = form
    .addPageBreakItem()
    .setTitle("Parent / Guardian Consent (Teen Submission)");

  form.addTextItem().setTitle("Parent/Guardian Name").setRequired(true);
  form.addTextItem().setTitle("Parent/Guardian Email").setRequired(true);

  form
    .addCheckboxItem()
    .setTitle("Guardian Confirmation")
    .setChoiceValues([
      "I confirm that I am the legal guardian and at least 18 years old."
    ])
    .setRequired(true);

  form
    .addCheckboxItem()
    .setTitle("Consent Confirmation (Teen Submission)")
    .setChoiceValues([
      "I am the parent or legal guardian of this contributor.\n" +
      "I confirm that this recording was made by my child and that we have the right to share it.\n" +
      "I give DigiMint Inc. (operator of the Kolenu app) permission to use, reproduce, and share this recording within the Kolenu app and related educational materials.\n" +
      "This permission is worldwide, royalty-free, and ongoing."
    ])
    .setHelpText(
      requiredClause +
      "\n\nLicense Version: 1.0 – Effective March 2026\n\n" +
      "Teen Contributors (Under 18)\n" +
      "To protect minors, we never publish last names.\n" +
      "Your child may be credited as: First Name + City — Example: Daniel (Age 13), Toronto\n\n" +
      "Parents/guardians must approve all teen submissions before publication."
    )
    .setRequired(true);

  // --- Adult Path ---
  const adultPage = form.addPageBreakItem().setTitle("Adult Submission Permission");

  form
    .addCheckboxItem()
    .setTitle("Age Confirmation")
    .setChoiceValues([
      "I confirm that I am at least 18 years old."
    ])
    .setRequired(true);

  form
    .addCheckboxItem()
    .setTitle("Permission Confirmation (Adult Submission)")
    .setChoiceValues([
      "Kolenu is a community-supported educational project.\n" +
      "By submitting this recording, I confirm that I am the original recorder and that I have the right to share it.\n" +
      "I give DigiMint Inc. (operator of the Kolenu app) permission to use, reproduce, and share my recording within the Kolenu app and related educational materials.\n" +
      "This permission is worldwide, royalty-free, and ongoing."
    ])
    .setHelpText(
      requiredClause +
      "\n\nLicense Version: 1.0 – Effective March 2026\n\n" +
      "Adult Contributors (18+)\n" +
      "You may be credited as: Full Name + City — Example: Rachel Cohen, Vancouver"
    )
    .setRequired(true);

  // --- Shared Section ---
  const sharedPage = form.addPageBreakItem().setTitle("Submission Details");

  teenPage.setGoToPage(sharedPage);
  adultPage.setGoToPage(sharedPage);

  contributorTypeItem.setChoices([
    contributorTypeItem.createChoice("Teen (parent/guardian submission)", teenPage),
    contributorTypeItem.createChoice("Adult", adultPage),
  ]);

  form.addSectionHeaderItem().setTitle("Contributor Details");

  form
    .addTextItem()
    .setTitle("Name")
    .setHelpText("For teens, only first name will be displayed. Adults may enter full name.")
    .setRequired(true);

  form.addTextItem().setTitle("City (optional)");
  form.addTextItem().setTitle("Synagogue or Community (optional)");

  form.addSectionHeaderItem().setTitle("Prayer Details");

  form.addTextItem().setTitle("Prayer Name").setRequired(true);
  form.addTextItem().setTitle("Nusach / Tradition (optional)");
  form.addTextItem().setTitle("Prayer Book / Reference (optional)");

  form.addSectionHeaderItem().setTitle("Audio Submission");

  form
    .addTextItem()
    .setTitle("Google Drive Link to Audio File")
    .setHelpText(
      "• Record long enough to complete the full prayer\n" +
      "• Avoid background noise if possible\n" +
      "• Ensure sharing is set to 'Anyone with the link can view'"
    )
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle("Comments (optional)")
    .setHelpText("Any additional notes about your recording, tradition, or submission.");

  form.setConfirmationMessage(
    "Thank you for contributing your voice to Kolenu.\n\n" +
    "Submissions are reviewed before being included as learning material.\n\n" +
    "Together, we strengthen our shared tradition."
  );

  Logger.log("Form URL: " + form.getPublishedUrl());
}