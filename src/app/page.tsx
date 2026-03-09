'use client'

import { getAllCountries, getCountryNameBySearch } from '@/api-lib/country'
import { Country } from '@/types'
import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'

import CountryCard from './components/countrycard'

import './page.css'

const Home = () => {
    const [palabra, setPalabra] = useState<string | null>(null)
    const [palabraFinal, setPalabraFinal] = useState<string | null>('')

    const [pais, setPais] = useState<Country[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    //Para iniciar la pagina con todos los paises cargados
    useEffect(() => {
        getAllCountries()
            .then((p) => {
                setPais(p)
            })
            .catch((e: AxiosError) => {
                setError(e.message)
            })
    }, [])

    //Para el buscador
    useEffect(() => {
        if (!palabraFinal) return

        setLoading(true)
        setError(null)

        getCountryNameBySearch(palabraFinal)
            .then((p) => {
                setPais(p)
            })
            .catch((e: AxiosError) => {
                setError(e.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [palabraFinal])

    return (
        <div className="mainContainer">
            <h1>Buscador de paises</h1>
            <br />
            <div className="searchBoxMain">
                <input onChange={(p) => setPalabra(p.target.value)}></input>
                <button onClick={() => setPalabraFinal(palabra)}>Buscar</button>
            </div>

            {loading && <h1> Loading...</h1>}
            {error && <h1> Error: {error}</h1>}

            <div className="countriesMainContainer">
                {!loading &&
                    !error &&
                    pais.length > 0 &&
                    pais.map((p) => <CountryCard key={p.name.common} country={p}></CountryCard>)}
            </div>
        </div>
    )
}

export default Home