export type Country = {
    cca2: string
    flag: string
    name: Name
    capital: string[]
    region: string
    subregion: string
    population: number
    languages: Record<string, string>
}

type Name = {
    common: string
    official: string
    nativeName: Record<string, Translation>
}

type Translation = {
    official: string
    common: string
}

export default Country