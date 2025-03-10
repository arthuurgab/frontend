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
          <li>
            <Link to="/tipo-despesas">Tipo Despesa</Link>
          </li>
          <li>
            <Link to="/tipo-prioridade">Tipo Prioridade</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
