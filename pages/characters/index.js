import useSWR from 'swr'
import { useState } from "react";
import Characters from '../../components/Characters/Characters';
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Head from "next/head";
import { render } from 'react-dom';
import SpeciesButtons from '../../components/SpeciesButtons/SpeciesButtons';


const fetcher = url => fetch(url).then(res => res.json())

export default function characters() {
  const { data, error } = useSWR('/api/characters', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  function Buttons() {
  const species = [];
    data.forEach(character => {
        if (species.includes(character.species)) {
            return data.map(( species ) => {
                return <button>{species}</button>
            });
        }

        species.push(character.species)

    });
}

    // getButtons = (p) => {
    //     const species = [];
    //     for (let i = 0; i < p.length; i++) {
    //         species.push(<button>[i]</button>)
    //     }
    //     return species;
    // }

    // console.log(species);

    // render() {
    
    //         <div>
    //             {this.getButtons()}
    //         </div>
        
    // }

//  function getSpecies() {
//      const [characters] = useState();
//      const filtered = characters.filter(character => {
//         return character.species === filtered;
//      })

//  }

//  render() {
//      let filteredSpecies = this.state.characters.filter((character) => {
//         return character.species.includes(this.state.getSpecies())
//      })
//  }

  return (
      <div className="container">
        <Head>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
    </Head>
 <Header/>
      <Nav/>
      <SpeciesButtons />

  
    <ul>
      {data.map((p, i) => (
        <Characters key={i} characters={p} />

      ))}
    </ul>


  
    
  
    </div>
  )
}