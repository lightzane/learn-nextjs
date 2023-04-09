import MainNavigation from './main-navigation';

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}
