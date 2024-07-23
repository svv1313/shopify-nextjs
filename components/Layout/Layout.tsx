import Nav from "../Nav";

interface IProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <div className="flex flex-col justify-between min-h-min">
      <Nav />
      <main>{children}</main>
      <footer>
        Footer
      </footer>
    </div>
  );
};
