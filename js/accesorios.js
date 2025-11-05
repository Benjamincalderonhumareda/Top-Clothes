const ACCESORIOS_URL = "data/accesorios.json";

function AccesorioCard({ item }) {
  return (
    <div className="bg-[#D9D9D9] rounded-md p-3 hover:shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="bg-white rounded overflow-hidden flex items-center justify-center" style={{ height: 160 }}>
        <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
      </div>

      <div className="mt-3 text-xs text-gray-700" style={{ fontFamily: "Abel, sans-serif" }}>
        <div className="mb-1">
          <span className="text-base text-gray-900 font-semibold block">{item.price}</span>
          {item.priceold && <span className="text-sm text-gray-500 line-through"> {item.priceold}</span>}
        </div>

        <h3 className="text-sm text-gray-900 font-medium mb-1">{item.title}</h3>

        <button className="mt-2 w-full bg-black text-white text-sm py-1 rounded-md hover:bg-gray-800 transition">
          Comprar
        </button>
      </div>
    </div>
  );
}

function Sidebar({ categories, selected, onSelect }) {
  const counts = {};
  categories.forEach((c) => { counts[c.id] = Array.isArray(c.items) ? c.items.length : 0; });

  return (
    <aside className="hidden lg:block w-56">
      <div className="bg-gray-50 p-3 rounded-md shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase">Tipo de producto</h3>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`flex justify-between items-center w-full text-left px-2 py-2 rounded-md text-sm mb-2 transition ${selected === c.id ? "bg-[#D9D9D9] text-black" : "hover:bg-gray-200"}`}
          >
            <span className="capitalize">{c.title}</span>
            <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              {typeof counts[c.id] !== "undefined" ? counts[c.id] : 0}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function MobilePills({ categories, selected, onSelect }) {
  return (
    <div className="lg:hidden mb-4 px-2">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`px-3 py-1 rounded-full whitespace-nowrap text-sm border ${selected === c.id ? " text-black border-black" : "bg-[#CECECE] text-gray-800 border-gray-200"}`}
          >
            {c.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function InfoPanel({ category, onViewAll }) {
  const defaultBullets = {
     Carteras: ["Clutch/Sobre", "Hobo", "De viaje", "Bowling", "Baguette"],
     Billeteras: ["Cuero de grano completo", "Tejidos sinteticos", "Estetico", "Diseño modernista","Algodon organico"],
     Morrales: ["Impermeables", "Artesanales", "Cuero completo", "Elegante", "Deportivo"],
     Relojes: ["Analógico", "Digital", "Resistente al agua", "Correa ajustable"],
     Bufandas: ["Clasicas", "Seda", "Algodon", "Pashmina", "Flexible","Franela"],
  };

  if (!category) {
    return (
      <aside className="w-full md:w-64">
        <div className="p-4 bg-[#3F3833] text-black rounded">
        </div>
      </aside>
    );
  }

  const bulletsFromJson = Array.isArray(category.bullets) ? category.bullets : null;
  const bullets = bulletsFromJson || defaultBullets[category.id] || [
    "Material de calidad",
    `${(category.items || []).length} productos disponibles`
  ];

  // imagen destacada (primera del array)
  const firstItem = (Array.isArray(category.items) && category.items.length > 0) ? category.items[0] : null;

  return (
    <aside className="w-full md:w-64">
      <div className="p-4 bg-[#3F3833] text-white rounded">
        <h4 className="font-semibold mb-3" style={{ fontFamily: "Karma, serif" }}>{category.title}</h4>

        {firstItem ? (
          <div className="mb-3 bg-white rounded overflow-hidden" style={{ height: 120 }}>
            <img src={firstItem.image} alt={firstItem.title} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="mb-3 bg-gray-800 rounded h-28 flex items-center justify-center">
            <span className="text-sm text-gray-300">Sin imagen</span>
          </div>
        )}

        <p className="text-sm mb-3"><strong>{(category.items || []).length}</strong> productos</p>

        <ul className="text-sm mb-3 space-y-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start">
              <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2 mt-1" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

      
      </div>
    </aside>
  );
}

function AccesoriosApp() {
  const [categories, setCategories] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    console.log("Fetching accesorios from:", ACCESORIOS_URL);
    fetch(ACCESORIOS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar " + ACCESORIOS_URL + " (status " + res.status + ")");
        return res.json();
      })
      .then((data) => {
        const cats = Array.isArray(data.categories) ? data.categories : [];
        console.log("Accesorios loaded:", cats.map(c => c.id));
        setCategories(cats);
        if (cats.length > 0) setSelected(cats[0].id);
      })
      .catch((err) => {
        console.error("Error cargando accesorios:", err);
        setError(err.message || String(err));
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentCat = categories.find((c) => c.id === selected) || null;
  const currentItems = currentCat ? (currentCat.items || []) : [];

  React.useEffect(() => {
    console.log("Selected category:", selected);
  }, [selected]);

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "Karma, serif" }}>NUESTROS ACCESORIOS</h1>

        {loading && <div className="text-center text-gray-600 mb-4">Cargando accesorios...</div>}
        {error && <div className="text-center text-red-600 mb-4">Error: {error}</div>}

        <MobilePills categories={categories} selected={selected} onSelect={setSelected} />

        <div className="flex gap-6">
          <Sidebar categories={categories} selected={selected} onSelect={setSelected} />

          <main className="flex-1">
            {currentCat ? (
              <div id="accesorios-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
                {currentItems.map((it) => <AccesorioCard key={it.id || it.title} item={it} />)}
              </div>
            ) : (
              <div className="text-gray-600">Selecciona una categoría</div>
            )}
          </main>

          <InfoPanel category={currentCat} onViewAll={() => {
            const grid = document.getElementById("accesorios-grid");
            if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
            console.log("Ver todos clickeado");
          }} />
        </div>
      </div>
    </div>
  );
}


  const root = ReactDOM.createRoot(document.getElementById("accesorios"));
  root.render(<AccesoriosApp />);

