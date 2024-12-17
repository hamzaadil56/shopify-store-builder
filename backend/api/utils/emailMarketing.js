const klaviyo = require("klaviyo-api");
const { ApiKeySession, ProfilesApi, ProfileEnum, ListsApi } = klaviyo;

const session = new ApiKeySession(process?.env?.KLAVIYO_API_KEY);
const profilesApi = new ProfilesApi(session);
const listsProfilesApi = new ListsApi(session);

const createKlaviyoProfile = async (email) => {
  const profile = {
    data: {
      type: ProfileEnum.Profile,
      attributes: {
        email: email,
      },
    },
  };

  try {
    const result = await profilesApi.createProfile(profile);
    console.log(result.response.data.data, "response");
    return result.response.data.data;
  } catch (error) {
    console.error("Error creating profile:", error?.message);
    throw new Error(error)?.message;
  }
};

const addProfileToEmailList = async (listId, profileId) => {
  const emailData = {
    data: [
      {
        type: ProfileEnum.Profile,
        id: profileId,
      },
    ],
  };
  // const addProfilesToList = [emailData];
  try {
    const result = await listsProfilesApi.addProfilesToList(listId, emailData);
    console.log(result, "response");
  } catch (error) {
    console.error("Error adding profile profile:", error?.message);
    throw new Error(error)?.message;
  }
};

const getEmailListId = async () => {
  try {
    const result = await listsProfilesApi.getLists();
    const lists = result.response.data.data;
    const list = lists.find((list) => list.attributes.name === "Email List");
    console.log(list.id, "list id");
    return list.id;
  } catch (error) {
    console.error("Error getting list:", error);
    throw new Error(error)?.message;
  }
};

// createKlaviyoProfile("hamzaadilvirtualman12@gmail.com");

// addProfileToEmailList("UN4hAD", "01JFAYGZP07TAJ09F821QGDTZS");

module.exports = {
  createKlaviyoProfile,
  addProfileToEmailList,
  getEmailListId,
};
