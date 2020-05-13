import { Segment } from 'semantic-ui-react';

export default ({ bugs }) => (
  // <li>
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>Name</th>
  //         <th>Price</th>
  //         <th>Location</th>
  //         <th>Image</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>{bugs.name}</td>
  //         <td>{bugs.price}</td>
  //         <td>{bugs.location}</td>
  //         <td>
  //           <img src={bugs.imageLink}></img>
  //         </td>
  //       </tr>
  //     </tbody>
  //   </table>
  // </li>

  <Segment.Group horizontal>
    <Segment>
      <img height="50" textAlign="center" src={bugs.imageLink}></img>
    </Segment>
    <Segment textAlign="center">{bugs.name}</Segment>
    <Segment>{bugs.price}</Segment>
    <Segment>{bugs.location}</Segment>
    <Segment>{bugs.time}</Segment>
  </Segment.Group>
);
