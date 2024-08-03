// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../client'; // Pastikan path ini benar

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [error, setError] = useState(null);

//   // Fetch data from Supabase
//   const fetchProducts = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('price_list')
//         .select('*')
//         .order('product_name', { ascending: true });

//       if (error) throw error;

//       setProducts(data);
//       setFilteredProducts(data);

//       // Get unique categories for the dropdown
//       const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
//       setCategories(uniqueCategories);
//     } catch (error) {
//       console.error('Error fetching products from Supabase:', error);
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     // Filter products based on search term and selected category
//     const lowerCaseSearchTerm = searchTerm.toLowerCase();

//     const filtered = products.filter(product => {
//       const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
//       const matchesSearch = product.product_name.toLowerCase().includes(lowerCaseSearchTerm);
//       return matchesCategory && matchesSearch;
//     });

//     setFilteredProducts(filtered);
//   }, [searchTerm, selectedCategory, products]);

//   return (
//     <div>
//       <h1>Product List</h1>

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       <div style={{ marginBottom: '20px' }}>
//         <label>
//           Search:
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by product name"
//           />
//         </label>

//         <label style={{ marginLeft: '20px' }}>
//           Category:
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </label>
//       </div>

//       {filteredProducts.length > 0 ? (
//         <ul>
//           {filteredProducts.map((product, index) => (
//             <li key={index} style={{ marginBottom: '10px' }}>
//               <strong>Product Name:</strong> {product.product_name}
//               <br />
//               <strong>Category:</strong> {product.category}
//               <br />
//               <strong>Brand:</strong> {product.brand}
//               <br />
//               <strong>Price:</strong> {product.price}
//               <br />
//               <strong>Description:</strong> {product.description}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No products found.</p>
//       )}
//     </div>
//   );
// }

// export default ProductList;


import React, { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('price_list')
          .select('*')
          .order('product_name', { ascending: true });

        if (error) throw error;

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => 
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category ? product.category === category : true)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {/* Generate options dynamically based on categories */}
          {[...new Set(products.map(product => product.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <ul className="space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <strong>Product Name:</strong> {product.product_name}
              <br />
              <strong>Category:</strong> {product.category}
              <br />
              <strong>Brand:</strong> {product.brand}
              <br />
              <strong>Price:</strong> {product.price}
              <br />
              <strong>Description:</strong> {product.description}
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
}

export default ProductList;
