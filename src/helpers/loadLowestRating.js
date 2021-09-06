import { db } from "../firebase/firebase-config";

export const loadLowestRating= async () => {

    const movieStore = await db.collection(`/Movies`).orderBy("rating", 'asc').get();
    let moviesList = [];
    // console.log("movieStore sin uid");
    // console.log(movieStore);

    movieStore.forEach((hijo) => {
      moviesList.push({
        id: hijo.id,
        ...hijo.data(),
      });
    });
  

  return moviesList;
};
