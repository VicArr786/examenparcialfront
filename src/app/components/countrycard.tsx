import { Country } from '@/types'
import { useRouter } from 'next/navigation'

import './countrycard.css'

type Props = {
    country: Country
}

const CountryCard = ({ country }: Props) => {
    const router = useRouter()

    return (
        <>
            <div className="countryBox">
                <button
                    onClick={() => {
                        router.push('/country/' + country.name.common)
                    }}
                >
                    <div className="">
                        <p>
                            {country.flag} {country.name.common}
                        </p>
                    </div>
                </button>
            </div>
        </>
    )
}

export default CountryCard