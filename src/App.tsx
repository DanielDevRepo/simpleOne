import { useEffect, useMemo, useState
 } from 'react'

import { useProducts } from './hook/useProducts';
import { Categories, type Category, type Nullable, type Product } from './type/product';
import { Button } from '@mui/material';
import AddProductDialog from './feature/addProduct';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [openDialog, setOpenDialog] = useState(false);
  const {products, getList} = useProducts();

  const memoProducts: Nullable<Product>[] = useMemo(() => products, [products]);

  useEffect(() => {
    getList();
  }, [getList]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return memoProducts;

    return memoProducts.filter(
      (product) => product && product.category === selectedCategory
    );
  }, [memoProducts, selectedCategory]);


  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <Button onClick={() => setOpenDialog(true)}>Add Product</Button>
        <aside className="filters-container">
            <div className='category'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | "All")}
            >
              <option value="All">All Categories</option>
              {Object.values(Categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            </div>
            <div className='range-filter'>

            </div>
        </aside>
        <div>
          <ul>
            {filteredProducts.filter((product) => product && product.id).map((product) => (
              <li
                key={product.id}
              >
                <div>
                  <img src={product.imageUrl} alt={product.name}/>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <span>{product.price}</span>
                </div>
                <button>
                  Ver Detalhes
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <AddProductDialog open={openDialog} setOpenDialog={setOpenDialog}/>
    </>
  )
}

export default App
