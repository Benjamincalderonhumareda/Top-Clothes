function Header() {
  return (
    <header className="bg-[#3F3833] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div
          id="menu-icon"
          className="md:hidden text-white text-3xl cursor-pointer hover:text-orange-400 transition-colors duration-200"
        >
          ☰
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
          TOP CLOTHES
        </h1>

        <nav id="menu" className="hidden md:flex space-x-8">
          <ul className="flex space-x-6 items-center">
            <li>
              <a
                href="index.html"
                className="text-white text-2xl  hover:text-orange-400 font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                INICIO
              </a>
            </li>
            <li>
              <a
                href="ropa.html"
                className="text-white text-2xl  hover:text-orange-400 font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                ROPA
              </a>
            </li>
            <li>
              <a
                href="calzado.html"
                className="text-white text-2xl  hover:text-orange-400 font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                CALZADO 
              </a>
            </li>
            <li>
              <a
                href="accesorios.html"
                className="text-white text-2xl  hover:text-orange-400 font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                ACCESORIOS
              </a>
            </li>
            <li>
              <a
                href="index.html"
                className="text-white text-2xl  hover:text-orange-400 font-medium transition-colors duration-200 hover:underline underline-offset-4"
              >
                CONTACTO
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
}

ReactDOM.render(<Header />, document.getElementById("header"));