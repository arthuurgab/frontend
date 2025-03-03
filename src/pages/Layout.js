import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/despesas">Despesas</Link>
          </li>
        </ul>
      </nav>
      <div className="w-screen flex justify-center p-6">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
