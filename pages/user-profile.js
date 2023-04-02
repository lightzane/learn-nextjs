export default function UserProfilePage(props) {
  return (
    <>
      <h1>{props.username}</h1>
    </>
  );
}

/**
 * Runs for every incoming request.
 * We can have access to the full request object
 */
export async function getServerSideProps(context) {
  const { params, req, res } = context;

  return {
    props: {
      username: 'lightzane',
    },
  };
}
