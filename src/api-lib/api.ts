import axios from "axios";

//Axios crea solo un / al final de la url
export const apiName = axios.create({
    baseURL : "https://www.thecocktaildb.com/api/json/v1/1",
    timeout : 1000
});

export const apiId = axios.create({
    baseURL : "https://www.thecocktaildb.com/api/json/v1/1",
    timeout : 1000
});
export const apiRandom= axios.create({
    baseURL : "https://www.thecocktaildb.com/api/json/v1/1",
    timeout : 1000
})