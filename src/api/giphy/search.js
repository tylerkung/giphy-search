import { giphyHost, giphyApiKey } from "./api-settings";

export default {
    search: async (searchTerm, fetchNum) => {
        const response = await fetch(`${giphyHost}/gifs/search?q=${searchTerm}&api_key=${giphyApiKey}&limit=${fetchNum}`, {
            method: "GET",
        });

        const giphyResponse = await response.json();
        console.log(response);
        if (giphyResponse.error){
            throw new Error(giphyResponse.error.en);
        }

        return giphyResponse;
    },
    trending: async (fetchNum) => {
        const response = await fetch(`${giphyHost}/gifs/trending?api_key=${giphyApiKey}&limit=${fetchNum}`, {
            method: "GET",
        });

        const giphyResponse = await response.json();
        console.log(response);
        if (giphyResponse.error){
            throw new Error(giphyResponse.error.en);
        }

        return giphyResponse;
    }
}
