'use client'

import {getCocktailById, getRandomCocktails} from "@/api-lib/cocktail";
import { Drink } from "@/types";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./drink.css";

const GetRandom = () => {
    //const { id } = useParams();
    const router = useRouter();

    const [cocktail, setCocktail] = useState<Drink | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        getRandomCocktails()
            .then((res: any) => {
                setCocktail(res.drinks[0]);
            })
            .catch((err: AxiosError) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    });


    return (
        <div className="mainContainer">
            {!loading && !error && cocktail && (
                <>
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />

                    <div className="drinkDataContainer">
                        <p>Nombre: {cocktail.strDrink}</p>
                        <p>Categoría: {cocktail.strCategory}</p>
                        <p>Tipo: {cocktail.strAlcoholic}</p>
                        <p>Vaso: {cocktail.strGlass}</p>
                        <p>Instrucciones: {cocktail.strInstructions}</p>
                        <p>IBA: {cocktail.strIBA}</p>
                        <p>Creative Commons: {cocktail.strCreativeCommonsConfirmed}</p>

                        <button onClick={() => router.back()}>Volver</button>
                    </div>
                </>
            )}

            {!cocktail && loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default GetRandom;