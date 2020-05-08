import Link from 'next/link'

export default ({ characters }) => (
    <li>
    {/* <Link href="/bugs/[id]" as={`/bugs/${bugs.name}`}>
      <a>{bugs.name}</a>
    </Link> */}

    <table>
      <thead>
        <tr>
           
          <th>Name</th>
            <th>Personality</th>
    
        </tr>
      </thead>
      <tbody>
        <tr>
        <td><img src={characters.imageLink}></img></td>
          <td>{characters.name}</td>
          <td>{characters.personality}</td>
        </tr>
      </tbody>
    </table>
    
    
  </li>
)