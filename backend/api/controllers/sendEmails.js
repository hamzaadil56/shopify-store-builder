const {
  createKlaviyoProfile,
  addProfileToEmailList,
  getEmailListId,
} = require("../utils/emailMarketing");

const sendEmailAfterCreatingStore = async (req, res) => {
  if (!req.body.email)
    return res.status(400).json({
      error: "Missing email in the request body.",
    });
  try {
    const profileData = await createKlaviyoProfile(req.body.email);
    const emailListId = await getEmailListId();
    await addProfileToEmailList(emailListId, profileData.id);
    return res.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
};

const createProfile = async (req, res) => {
  try {
    const profileData = await createKlaviyoProfile(req.body.email);
    return res.json({
      message: "Profile Created Successfully",
      profileData,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      details: error?.message,
    });
  }
};

const addProfile = async (req, res) => {
  try {
    const emailListId = await getEmailListId();
    const profileData = await addProfileToEmailList(emailListId, req.body.id);
    return res.json({
      message: "Profile added to email list successfully",
      profileData,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
};

module.exports = {
  sendEmailAfterCreatingStore,
  createProfile,
  addProfile,
};
