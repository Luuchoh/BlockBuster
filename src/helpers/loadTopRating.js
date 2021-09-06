import { db } from "../firebase/firebase-config";

export const loadTopRating= async () => {

    const movieStore = await db.collection(`/Movies`).orderBy("rating", 'desc').get();
    let movieList=[];
    console.log("movieStore sin uid");
    console.log(movieStore);
  
    movieStore.forEach((hijo) => {
      movieList.push({
        id: hijo.id,
        ...hijo.data(),
      });
    });

  return movieList;
};
