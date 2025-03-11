import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-dark">
              Café & Gambiarra
            </span>
          </a>
        </div>
      </nav>
      <nav class="bg-[#efefef]">
        <div class="max-w-screen-xl px-3 py-2 mx-auto">
          <div class="flex items-center">
            <ul class="flex flex-row mt-0 space-x-8 rtl:space-x-reverse text-lg">
              <Link className="" to="/despesas">
                Despesa
              </Link>
              <Link className="" to="/tipo-despesas">
                Tipo Despesa
              </Link>
              <Link className="" to="/tipo-prioridade">
                Tipo Prioridade
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#4B2E20]">
          <ul className="space-y-4 font-medium text-white mt-10">
            <li>
              <Link className="flex items-center p-2 rounded-lg group" to="/">
                Home
              </Link>
            </li>
            <li class="menu-header small">
              <span class="menu-header-text p-2 italic text-uppercase text-dark text-xs font-medium">
                Ferramentas
              </span>
            </li>
            <li>
              <Link
                className="flex items-center p-2 rounded-lg group"
                to="/despesas"
              >
                Despesas
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
