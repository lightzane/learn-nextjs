import { useEffect, useState } from 'react';
import useSWR from 'swr';

// * Client-side data fetching

export default function GetUsersPage(props) {
  const [isLoading, setIsLoading] = useState();
  const [users, setUsers] = useState(props.sales); // props.sales is optional

  // Traditional ===================================================
  // useEffect(() => {
  //   setIsLoading(true);

  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setIsLoading(false);
  //       setUsers(data);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <>Loading...</>;
  // }

  // if (!users) {
  //   return <>No data...</>;
  // }
  // ===================================================

  // SWR
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/users',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setUsers(data);
    }
  }, [data]);

  if (error) {
    return <>Failed to load...</>;
  }

  if (!data || !users) {
    return <>Loading...</>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Optional to pre-render
export async function getStaticProps() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
      return {
        props: {
          users: data,
        },
        revalidate: 10,
      };
    });
}
