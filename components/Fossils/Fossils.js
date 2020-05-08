import Link from 'next/link'

export default ({ fossils }) => (
    <li>
    {/* <Link href="/bugs/[id]" as={`/bugs/${bugs.name}`}>
      <a>{bugs.name}</a>
    </Link> */}

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Image</th>
    
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{fossils.name}</td>
          <td>{fossils.price}</td>
          <td><img src={fossils.imageLink}></img></td>
        </tr>
      </tbody>
    </table>
    
    
  </li>
)