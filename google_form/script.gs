function createKolenuUnifiedFormSinglePage() {
  const form = FormApp.create("Kolenu Voice Submission");
  // Do not require Google sign-in; respondents can submit with or without logging in.
  form.setCollectEmail(false);
  const requiredClause =
    "I confirm either (a) the melody is traditional/public-domain nusach, or (b) we have\n" +
    "permission to submit and use this performance.\n\n" +
    "I understand participation is voluntary, no placement is guaranteed, and Kolenu may\n" +
    "remove content at its discretion.\n\n" +
    "I approve display attribution as selected in this form (first name/city or anonymous).";

  form.setDescription(
    "Thank you for contributing to Kolenu.\n\n" +
      "This form accepts Hebrew prayer recordings from both teens (via parent/guardian) and adults.\n\n" +
      "Upload your audio to your own Google Drive and set sharing to:\n" +
      "'Anyone with the link can view'\n" +
      "Then paste the link below.",
  );

  // --- Contributor Type (branch selector) ---
  const contributorTypeItem = form
    .addMultipleChoiceItem()
    .setTitle("I am submitting as:")
    .setRequired(true)
    .setHelpText(
      "Select contributor type. You will be routed to the required consent section.",
    );

  // --- Teen Path ---
  const teenPage = form
    .addPageBreakItem()
    .setTitle("Parent / Guardian Consent (for Teens)");

  // --- Teen Path ---
  form.addTextItem().setTitle("Parent/Guardian Name").setRequired(true);
  form.addTextItem().setTitle("Parent/Guardian Email").setRequired(true);
  form
    .addCheckboxItem()
    .setTitle("Consent Confirmation (for Teens)")
    .setChoiceValues([
      "I confirm the parent/guardian consent terms above and the required clause in this section.",
    ])
    .setHelpText(
      "I am the parent or legal guardian of the minor identified in this submission.\n\n" +
        "Kolenu is a community-supported educational project. By submitting this recording, I grant DigiMint Inc. (operator of the Kolenu app) a non-exclusive, worldwide, irrevocable, royalty-free license to use, reproduce, distribute, and publicly perform my child’s submitted voice recording for educational purposes within the Kolenu app and related materials.\n\n" +
        requiredClause,
    )
    .setRequired(true);

  // --- Teen Attribution Preference ---
  form
    .addMultipleChoiceItem()
    .setTitle("How should this recording be attributed? (Teen submissions)")
    .setChoiceValues(["First Name + City", "First Name only", "Anonymous"])
    .setHelpText(
      'Recommended attribution: "Voice contributed by Daniel (Age 13), Toronto"\n\n' +
        "Privacy-first alternatives:\n" +
        '• "Youth contributor, Toronto"\n' +
        '• "Youth contributor"',
    )
    .setRequired(true);

  // --- Adult Path ---
  const adultPage = form.addPageBreakItem().setTitle("Adult Permission");

  form.addTextItem().setTitle("Email").setRequired(true);
  form
    .addCheckboxItem()
    .setTitle("Permission Confirmation (for Adults)")
    .setChoiceValues([
      "Kolenu is a community-supported educational project. By submitting this recording, I grant DigiMint Inc. (operator of the Kolenu app) a non-exclusive, worldwide, irrevocable, royalty-free license to use, reproduce, distribute, and publicly perform my recording for educational purposes within the Kolenu app and related materials.",
    ])
    .setHelpText(
      requiredClause +
        '\n\nAdult attribution will be generated from your submitted name and city (for example: "Voice contributed by Daniel Goldman, Toronto").',
    )
    .setRequired(true);

  // --- Shared Path ---
  const sharedPage = form.addPageBreakItem().setTitle("Submission Details");

  // Route both contributor types to shared section after consent pages
  teenPage.setGoToPage(sharedPage);
  adultPage.setGoToPage(sharedPage);

  // Attach branch routing choices after pages exist
  contributorTypeItem.setChoices([
    contributorTypeItem.createChoice(
      "Teen (parent/guardian submission)",
      teenPage,
    ),
    contributorTypeItem.createChoice("Adult", adultPage),
  ]);

  // --- Shared Section: Contributor Details ---
  form.addSectionHeaderItem().setTitle("Contributor Details");
  form
    .addTextItem()
    .setTitle("Name")
    .setHelpText(
      "For teens: only first name will be displayed. Adults may enter full name.",
    )
    .setRequired(true);
  form.addTextItem().setTitle("City (optional)");
  form.addTextItem().setTitle("Synagogue/Community (optional)");

  // --- Shared Section: Prayer Details ---
  form.addSectionHeaderItem().setTitle("Prayer Details");
  form.addTextItem().setTitle("Prayer Name").setRequired(true);
  form.addTextItem().setTitle("Nusach / Tradition (optional)");
  form.addTextItem().setTitle("Prayer Book / Reference / Link (optional)");

  // --- Section: Audio Submission ---
  form.addSectionHeaderItem().setTitle("Audio Submission");
  form
    .addTextItem()
    .setTitle("Google Drive Link to Audio File")
    .setHelpText(
      "• Record long enough to complete the full prayer\n" +
        "• Avoid background noise if possible\n" +
        "• Ensure sharing is set to 'Anyone with the link can view'",
    )
    .setRequired(true);

  // --- Confirmation Message ---
  form.setConfirmationMessage(
    "Thank you for your contribution to Kolenu. Submissions are reviewed before being used as learning material.",
  );

  Logger.log("Form URL: " + form.getPublishedUrl());
}
