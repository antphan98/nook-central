import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function deepsea() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/deepsea/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Time</th>
          <th>Shadow Size</th>
          <th>Shadow Movement</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img src={data.wikiImageUrl}></img>
          </td>
          <td>{data.name}</td>
          <td>{data.time}</td>
          <td>{data.shadowSize}</td>
          <td>{data.shadowMovement}</td>
          <td>{data.price}</td>
        </tr>
      </tbody>
    </table>
  );
}
