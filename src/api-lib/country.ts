import { api } from '@/api-lib/api'

export const getAllCountries = async () => {
    const response = await api.get('all?fields=name,flag')
    return response.data
}

export const getCountryNameBySearch = async (name: string) => {
    const response = await api.get(`name/${name}?fields=name,flag,cca2`)
    return response.data
}

export const getCountryByFullName = async (name: string) => {
    const response = await api.get(
        `name/${name}?fullText=true&fields=name,flag,capital,region,population,languages`,
    )
    return response.data[0]
}