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

export default function art() {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/art/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Forgery</th>
          <th>Description</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.name}</td>
          <td>{data.hasForgery}</td>
          <td>{data.desc}</td>
          <td>
            <img src={data.imageLink}></img>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
