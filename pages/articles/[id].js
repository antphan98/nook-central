import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = async url => {
  const res = await fetch('https://www.gamespot.com/api/articles/?format=json&api_key=ce3e6d5e61b7cecf7d622fedfceb1ab2de3ade0b&filter=association%3A5000-487113&sort=publish_date:desc')
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data;
}

export default function articles() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.id && `/api/articles/${query.id}`,
    fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>

          <th>Image</th>
    
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.name}</td>
  
          <td><img src={data.image}></img></td>
        </tr>
      </tbody>
    </table>
  )
}