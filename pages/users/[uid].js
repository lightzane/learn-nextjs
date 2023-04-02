export default function UserDetailPage(props) {
  return <>Id: {props.id}</>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      id: `userId-${params.uid}`,
    },
  };
}
