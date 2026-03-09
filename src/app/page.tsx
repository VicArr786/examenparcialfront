'use client'

import {getCocktailsByName, getRandomCocktails} from "@/api-lib/cocktail";
import { Drink } from "@/types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./drink.css";
import {isThenable} from "next/dist/shared/lib/is-thenable";

const Home = () => {
    // Para el buscador
    const [name, setName] = useState<string>("");
    const [finalName, setFinalName] = useState<string>("");
    const [random,setRandom] = useState<boolean>(false);

    // Para las rutas
    const router = useRouter();

    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (!finalName) return;
        setLoading(true);
        setError(null);
        getCocktailsByName(finalName)
            .then((d) => {
                setDrinks(d.drinks || []);
            })
            .catch((err: AxiosError) => {
                setError(err.message);
                setDrinks([]);
            })
            .finally(() => {
                setLoading(false);
            });


        if (random) getRandomCocktails().then((d) => {
                setDrinks(d.drinks || []);
            }).catch((err: AxiosError) => {
                setError(err.message);
                setDrinks([]);
            }).finally(() => {
                setLoading(false);
             });


    }, [finalName]);





    return (
        <div className="pageContainer">
            <h1>Buscador de cócteles</h1>



            <div className="searchBox">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Escribe un cóctel"
                />
                <button
                    onClick={() => {
                        setRandom(false);
                        setFinalName(name);

                    }}
                >
                    Buscar cóctel
                </button>
                <button
                    className="randomButton"
                    onClick={() => {
                        setRandom(true);
                    }}
                >Dime algo bonito
                </button>
            </div>


            {loading && <h2>Loading...</h2>}
            {error && <h2>Error: {error}</h2>}

            {!loading && !error && finalName && drinks.length === 0 && (
                <h2>No se encontraron cócteles</h2>
            )}

            <div className="drinksGrid">
                {!loading &&
                    !error &&
                    drinks.length > 0 &&
                    drinks.map((drink) => (
                        <div className="drinkCard" key={drink.idDrink}>
                            <button
                                className="drinkButton"
                                onClick={() => {
                                    router.push("/drink/" + drink.idDrink);
                                }}
                            >
                                {drink.strDrinkThumb && (
                                    <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                                )}

                                <div className="drinkDataContainer">
                                    <p><strong>Name:</strong> {drink.strDrink}</p>
                                    <p><strong>Category:</strong> {drink.strCategory}</p>
                                    <p><strong>Glass:</strong> {drink.strGlass}</p>
                                </div>
                            </button>
                        </div>
                    ))}
                <div className="drinksRandom">
                    {!loading &&
                        !error &&
                        drinks.length > 0 &&
                        drinks.map((drink) => (
                            <div className="drinkCard" >
                                <button
                                    className="drinkButton"
                                    onClick={() => {
                                        router.push("/drink/" + drink.idDrink);
                                    }}
                                >
                                    {drink.strDrinkThumb && (
                                        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                                    )}

                                    <div className="drinkDataContainer">
                                        <p><strong>Name:</strong> {drink.strDrink}</p>
                                        <p><strong>Category:</strong> {drink.strCategory}</p>
                                        <p><strong>Glass:</strong> {drink.strGlass}</p>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
            </div>

        </div>

    );
};

export default Home;