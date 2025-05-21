import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async()=>{
  try {
    account.createOAuth2Session(
      OAuthProvider.Google
    )
  } catch (e) {
    console.log('loginWithGoogle',e);
  }
}

export const getUser = async()=>{
  try {
    const user = await account.get();

    if(!user) return redirect('/sign-in');

    const {documents} = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal('accountId', user.$id),
        Query.select(['name', 'email', 'imageUrl', 'joinedAt','accountId'])
      ]
    )
  } catch (e) {
    console.log(e);
  }
}

export const logoutUser = async()=>{
  try {
    await account.deleteSession('current');
    return true;
  } catch (e) {
    console.log('logoutUser error',e);
  }
}

export const getGooglePicture = async()=>{
  try {
    const session = await account.getSession('current');
    const oAuthToken = session.providerAccessToken;

    if(!oAuthToken) {
      console.log('No OAuth token avialable');
      return null;
    }

    const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos',
      {
        headers: {
          Authorization: `Bearer ${oAuthToken}`
        }
      }
    );

    if(!response.ok){
      console.log('Failed to getch profile photo from Google people API');
      return null;
    }

    const data = await response.json();

    const photoUrl = data.photos && data.photos.length > 0 ? data.photos[0].url : null;

    return photoUrl;
  } catch (e) {
    console.log('getGooglePicture error',e);
  }
}

export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) {
      return null;
    }

    // Check if user already exists
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', user.$id)]
    );

    if (documents.length > 0) {
      // User already exists, no need to store again
      return documents[0];
    }

    const imageUrl = await getGooglePicture();

    // Store new user data
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name: user.name,
        email: user.email,
        imageUrl: imageUrl,
        joinedAt: new Date().toISOString(),
        accountId: user.$id
      }
    );

    return newUser;
  } catch (e) {
    console.log('storeUserData error', e);
  }
}

export const getExistingUser = async () => {
  try {
    const user = await account.get();
    if (!user) return null;

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', user.$id)]
    );

    return documents.length > 0 ? documents[0] : null;
  } catch (e) {
    console.log('getExistingUser error',e);
    return null;
  }
}