import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function ProtectedPage() {
  return <div>This is a protected page</div>;
}

export const getServerSideProps = withPageAuthRequired();
