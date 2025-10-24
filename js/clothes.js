const CLOTHES_URL = "data/clothesdb.json";

function ClothesCard({ clothe }) {
  return (
    <div className="bg-[#C6C4C4] rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden h-64">
        <img
          src={clothe.image}
          alt={clothe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          style={{ zIndex: 1 }}
        />
        {/* Overlay solo aparece en hover */}
        <div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{ zIndex: 2 }}
        ></div>
      </div>

      <div className="p-1">
        <p className="text-gray-900 text-xl font-semibold font-itim mb-2 leading-tight">
          {clothe.price}
        </p>
      </div>

      <div className="p-1">
        <h3 className="text-xl font-abel text-xl text-gray-900  mb-2 hover:text-black-600  ">
          {clothe.title}
        </h3>


        <div className="flex flex-wrap gap-2 items-right justify-between">

          <div className="">

            <div className="flex justify-between items-center mb-4">
              

              <p className="text-gray-600 text-sm leading-relaxed">
                {clothe.description}
              </p>

              {clothe.tendencia && (
                <p className="text-black-600 text-sm font-medium ml-4">
                  {clothe.tendencia}
                </p>
                
              )
              
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClothesGrid({ clothes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {clothes.map((clothe, idx) => (
        <ClothesCard key={idx} clothe={clothe} />
      ))}
    </div>
  );
}

function App() {
  const [clothes, setClothes] = React.useState([]);

  React.useEffect(() => {
    fetch(CLOTHES_URL)
      .then((res) => res.json())
      .then((data) => {
        setClothes(data); // Simplificado
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div class="min-h-screen bg-white">
      <div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">
          La moda que viene con Top Clothes
        </h1>
        <ClothesGrid clothes={clothes} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("clothesgrid"));
root.render(<App />);