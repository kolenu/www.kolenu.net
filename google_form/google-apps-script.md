## **Step 1 — Open Google Apps Script**

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **“New project”**

---

## **Step 2 — Paste the Script**

1. Delete any default code in the editor.
2. Copy the current `script.gs` and paste it into the editor.
3. Save the project with a name, e.g., `Kolenu Voice Form`.

---

## **Step 3 — Run the Script**

1. Click the **▶ Run** button.
2. The first time you run the script, Google will ask for **authorization**:

   * Click **Review Permissions** → choose your Google account → click **Allow**.

---

## **Step 4 — Get the Form URL**

1. After the script runs, click **View → Logs** in the Apps Script editor.
2. You will see a form URL in the logs.
3. Click that link to open your new Google Form.

## **Step 5 — Share the Form**

1. Click **Send** in the top-right of the Google Form.
2. Copy the **link** to share with contributors.
3. For the audio field, remind users:

   > Upload your recording to **your own Google Drive**, set it to **“Anyone with the link can view”**, and paste the link in the form.

---

### ✅ Notes

* The form uses **branching sections** (not a single page):
   * **Teen (parent/guardian submission)** → Parent/Guardian Consent section
   * **Adult** → Adult Permission section
   * Both paths continue to shared **Submission Details**
* **Both teen and adult paths require legal confirmation** in required checkbox fields.
* **Teen submissions** include an attribution preference question:
   * First Name + City / First Name only / Anonymous
* **Adult submissions** do not see that attribution question; attribution is generated from submitted name/city.
* Shared sections collect contributor details, prayer details, and Google Drive audio link.

