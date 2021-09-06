import { db } from "../firebase/firebase-config";

export const load= async (uid) => {
  const moviesList = [];
  if (uid) {
    const movieStore = await db
      .collection(`/Movies`)
      .where("name", '==', uid)
      .get();
    // console.log("movieStore");
    // console.log(movieStore);

    movieStore.forEach((hijo) => {
      moviesList.push({
        id: hijo.id,
        ...hijo.data(),
      });
    });
  } else {
    const movieStore = await db.collection(`/Movies`).get();

    // console.log("movieStore sin uid");
    // console.log(movieStore);

    movieStore.forEach((hijo) => {
      moviesList.push({
        id: hijo.id,
        ...hijo.data(),
      });
    });
  }

  return moviesList;
};
