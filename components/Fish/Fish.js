import Link from 'next/link'

export default ({ fish }) => (
    <li>
    {/* <Link href="/fish/[id]" as={`/fish/${fish.name}`}>
      <a>{fish.name}</a>
    </Link> */}

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Location</th>
          <th>Image</th>
    
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{fish.name}</td>
          <td>{fish.price}</td>
          <td>{fish.location}</td>
          <td><img src={fish.imageLink}></img></td>
        </tr>
      </tbody>
    </table>  
  </li>
)