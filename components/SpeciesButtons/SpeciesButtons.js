import useSWR from 'swr'
import { Component } from "react"


const fetcher = url => fetch(url).then(res => res.json())


function SpeciesButtons() {
    const { data, error } = useSWR('/api/characters', fetcher)

    function getSpecies() {
    const species = [];
    data.forEach(character => {
        if (species.includes(character.species)) {
            return data.map(( species ) => {
                return <button>{species}</button>;
            });
        }

        species.push(<button>character.species</button>)
        console.log(character.species)


    });
    }


return (


    <div>
        {this.getSpecies}
    </div>

)

}

export default SpeciesButtons;