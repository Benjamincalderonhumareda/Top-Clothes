const ROPA_URL = "data/ropa.json";
function RopasCard({ ropa }) {
  return (
    <div className="bg-[#D9D9D9] rounded-md p-4 hover:shadow-lg transition-transform duration-200 hover:scale-105" >
      <img
        src={ropa.image}
        alt={ropa.title}
        className="w-full h-80 object-cover rounded-md mb-3 "
      />

      <div className="flex justify-between items-start mb-2" >
        <p className="text-gray-900 text-xl font-semibold" >{ropa.price}</p>
        <p className="text-gray-600 text-xl ">{ropa.sizes}</p>
      </div>

      <h3 className="text-xl font-abel text-gray-900 mb-2 hover:text-black"  >
        {ropa.title}
      </h3>

      <p className="text-gray-800 text-sm mb-3 text-l" >{ropa.colors}</p>

      {/* 🔘 Botón de Comprar */}
      <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition-all duration-200">
        Comprar
      </button>
    </div>
  );
}


function RopasGrid({ ropas, title }) {
  return (
    <section className="mb-12">
        <h2 className="text-2xl text-gray-800 mb-4" style={{ fontFamily: "Karma", fontWeight: 600 }}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
        {ropas.map((ropa, idx) => (
          <RopasCard key={idx} ropa={ropa} />
        ))}
      </div>
    </section>
  );
}

function App() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch(ROPA_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar data/ropa.json");
        return res.json();
      })
      .then((data) => {
        console.log("DATA ->", data);
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching ropas:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">
          AGREGAR TEXTO, NOSE
        </h1>

        {categories.map((cat, index) => (
          <RopasGrid key={index} title={cat.title} ropas={cat.items} />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("ropa"));
root.render(<App />);