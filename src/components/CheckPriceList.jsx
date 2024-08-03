// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../client'; // Pastikan path ini benar

// function PriceList() {
//   const [priceList, setPriceList] = useState([]);
//   const [error, setError] = useState(null);

//   // Akses environment variables
//   const apiUrl = import.meta.env.VITE_ANWRNKXYIGS;
//   const username = import.meta.env.VITE_UANZXHIOFH;
//   const sign = import.meta.env.VITE_SKDAFNXIU;

//   useEffect(() => {
//     const fetchPriceList = async () => {
//       try {
//         // Fetch data from external API
//         const response = await fetch(`${apiUrl}/price-list`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             cmd: 'prepaid',
//             username: username,
//             code: '', // Hapus jika tidak ingin mengirimkan kode produk
//             sign: sign,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data); // Log untuk melihat struktur data

//         if (Array.isArray(data.data)) {
//           const uniqueProducts = new Map();

//           // Filter out duplicate products
//           data.data.forEach((product) => {
//             const key = `${product.product_name}-${product.category}-${product.brand}`;
//             if (!uniqueProducts.has(key)) {
//               uniqueProducts.set(key, product);
//             }
//           });

//           const uniqueProductList = Array.from(uniqueProducts.values());
//           setPriceList(uniqueProductList);

//           // Perbarui atau tambahkan data ke Supabase
//           for (const product of uniqueProductList) {
//             const { error } = await supabase.from('price_list').upsert(
//               {
//                 product_name: product.product_name,
//                 category: product.category,
//                 brand: product.brand,
//                 price: product.price,
//                 description: product.desc,
//               },
//               {
//                 onConflict: ['product_name', 'category', 'brand'],
//               }
//             );

//             if (error) {
//               console.error('Error inserting/updating data:', error.message);
//               setError(error.message);
//             }
//           }
//         } else {
//           console.error('Data received is not an array:', data.data);
//           setError('Invalid data format received');
//         }
//       } catch (error) {
//         console.error('Error fetching price list:', error);
//         setError(error.message);
//       }
//     };

//     fetchPriceList();
//   }, [apiUrl, username, sign]);

//   // Fungsi untuk mengambil data dari Supabase
//   const fetchFromSupabase = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('price_list')
//         .select('*')
//         .order('product_name', { ascending: true });

//       if (error) throw error;

//       setPriceList(data);
//     } catch (error) {
//       console.error('Error fetching price list from Supabase:', error);
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchFromSupabase();
//     // Polling untuk memperbarui data setiap 10 detik
//     const interval = setInterval(() => {
//       fetchFromSupabase();
//     }, 10000);

//     // Cleanup interval saat komponen di-unmount
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h1>Price List</h1>
//       {error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <ul>
//           {priceList.length > 0 ? (
//             priceList.map((product, index) => (
//               <li key={index} style={{ marginBottom: '10px' }}>
//                 <strong>Product Name:</strong> {product.product_name}
//                 <br />
//                 <strong>Category:</strong> {product.category}
//                 <br />
//                 <strong>Brand:</strong> {product.brand}
//                 <br />
//                 <strong>Price:</strong> {product.price}
//                 <br />
//                 <strong>Description:</strong> {product.description}
//               </li>
//             ))
//           ) : (
//             <p>No products available.</p>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default PriceList;










import React, { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';

function CheckPriceList() {
  const [priceList, setPriceList] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_ANWRNKXYIGS;
  const username = import.meta.env.VITE_UANZXHIOFH;
  const sign = import.meta.env.VITE_SKDAFNXIU;

  useEffect(() => {
    const updatePriceList = async () => {
      try {
        // Fetch data from external API
        const response = await fetch(`${apiUrl}/price-list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cmd: 'prepaid',
            username: username,
            code: '',
            sign: sign,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data.data)) {
          const uniqueProducts = new Map();

          // Filter out duplicate products
          data.data.forEach((product) => {
            const key = `${product.product_name}-${product.category}-${product.brand}`;
            if (!uniqueProducts.has(key)) {
              uniqueProducts.set(key, product);
            }
          });

          const uniqueProductList = Array.from(uniqueProducts.values());

          // Update or insert data into Supabase
          for (const product of uniqueProductList) {
            const { error } = await supabase.from('price_list').upsert(
              {
                product_name: product.product_name,
                category: product.category,
                brand: product.brand,
                price: product.price,
                description: product.desc,
              },
              {
                onConflict: ['product_name', 'category', 'brand'],
              }
            );

            if (error) {
              console.error('Error inserting/updating data:', error.message);
              setError(error.message);
            }
          }
        } else {
          console.error('Data received is not an array:', data.data);
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching price list:', error);
        setError(error.message);
      }
    };

    updatePriceList();
  }, [apiUrl, username, sign]);

  // Fetch updated data from Supabase
  const fetchFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('price_list')
        .select('*')
        .order('product_name', { ascending: true });

      if (error) throw error;

      setPriceList(data);
    } catch (error) {
      console.error('Error fetching price list from Supabase:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFromSupabase();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price List</h1>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className="space-y-4">
          {priceList.length > 0 ? (
            priceList.map((product, index) => (
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
      )}
    </div>
  );
}

export default CheckPriceList;
