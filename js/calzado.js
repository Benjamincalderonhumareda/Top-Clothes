const CALZADO_URL = "data/calzado.json";

function CalzadosCard({ calzado }) {
  return (
    <div className="bg-[#D9D9D9] rounded-md p-3 hover:shadow-lg transition-transform duration-200 hover:scale-105">
      <div className="bg-white rounded overflow-hidden flex items-center justify-center" style={{height: 160}}>
        <img
          src={calzado.image}
          alt={calzado.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="mt-3 text-xs text-gray-700" style={{ fontFamily: "Abel, sans-serif" }}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xl text-gray-900 font-semibold">{calzado.price}</span>
          <span className=" text-xl text-gray-600">{calzado.sizes}</span>
        </div>

        <div className="text-xl text-gray-900 font-medium mb-1" style={{minHeight: 36}}>
          {calzado.title}
        </div>

        <button className="mt-2 w-full bg-black text-white text-sm py-1 rounded-md hover:bg-gray-800 transition" style={{ fontFamily: "Abel, sans-serif" }}>
          Comprar
        </button>
      </div>
    </div>
  );
}

function CategoryRow({ title, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4" style={{ fontFamily: "Karma, serif", fontWeight: 600 }}>
          {title}
        </h2>

        {/* grid responsivo: varias columnas por fila */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            alignItems: "start"
          }}
        >
          {items.map((calzado) => (
            <CalzadosCard key={calzado.id ? calzado.id : calzado.title} calzado={calzado} />

          ))}
        </div>
      </div>
    </section>
  );
}

/* APP: carga JSON y renderiza EN ESTE ORDEN: NIÑOS, MUJER, HOMBRE (si existen) */
function App() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch(CALZADO_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar data/calzado.json");
        return res.json();
      })
      .then((data) => {
        // esperamos formato { categories: [ { id, title, items: [...] }, ... ] }
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      })
      .catch((err) => {
        console.error("Error fetching calzado:", err);
        setCategories([]);
      });
  }, []);

  // Orden explícito de filas que quieres mostrar
  const order = ["hombre", "mujer", "ninos"];

  // Mapear categories por id para buscar rápido
  const catMap = React.useMemo(() => {
    const m = {};
    categories.forEach((c) => {
      if (c && c.id) m[c.id.toLowerCase()] = c;
    });
    return m;
  }, [categories]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10" style={{ fontFamily: "Karma, serif" }}>
          CALZADO
        </h1>

        {/* Renderizar las 3 filas en el orden deseado */}
        {order.map((id) => {
          const cat = catMap[id];
          return cat ? <CategoryRow key={id} title={cat.title} items={cat.items || []} /> : null;
        })}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("calzado"));
root.render(<App />);
