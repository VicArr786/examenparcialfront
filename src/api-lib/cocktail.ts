import { apiName, apiId } from "./api";
import { Drink, DrinkResponse } from "@/types";

export const getCocktailById = async (id : number) => {
    const response = await apiId.get<Drink>("lookup.php?i="+id);
    return response.data;
}

export const getCocktailsByName = async (name : string) => {
    const response = await apiName.get<DrinkResponse>("search.php?s="+name)
    return response.data;
}
export const getRandomCocktails = async () => {
    const response = await apiName.get<DrinkResponse>("random.php")
    return response.data;
}

