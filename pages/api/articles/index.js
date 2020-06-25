import fetch from 'node-fetch';

export default async (req, res) => {
  const data = await fetch(
    `https://www.gamespot.com/api/articles/?format=json&api_key=ce3e6d5e61b7cecf7d622fedfceb1ab2de3ade0b&filter=association%3A5000-487113&sort=publish_date:desc&limit=10`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json',
      },
    }
  ).then((res) => res.json());

  res.status(200).json(data);
};
