'use client'

import { useParams, useRouter } from 'next/navigation'
import { Country } from '@/types'
import { useEffect, useState } from 'react'
import { getCountryByFullName } from '@/api-lib/country'
import { AxiosError } from 'axios'

import './page.css'

const CountryInfo = () => {
    const { name } = useParams()

    const router = useRouter()

    const [pais, setPais] = useState<Country | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!name) return

        setLoading(true)
        setError(null)

        getCountryByFullName(name as string)
            .then((c) => {
                setPais(c)
            })
            .catch((e: AxiosError) => {
                setError(e.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [name])

    return (
        <>
            <div className="mainContainer">
                {!loading && !error && pais && (
                    <div className="country-info">
                        <p>Nombre oficial: {pais?.name.official}</p>
                        <p>Bandera: {pais?.flag}</p>
                        <p>Capital: {pais?.capital?.join(',')}</p>
                        <p>Region: {pais?.region}</p>
                        <p>Poblacion: {pais?.population}</p>
                        <p>Idiomas: {Object.values(pais?.languages || {}).join(', ')}</p>
                        <button onClick={() => router.back()}>Volver</button>
                    </div>
                )}

                {!pais && loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </div>
        </>
    )
}

export default CountryInfo