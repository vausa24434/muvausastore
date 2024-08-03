
// import React, { useState } from 'react';
// import axios from 'axios';

// const apiUrl = import.meta.env.VITE_ANWRNKXYIGS;
// const username = import.meta.env.VITE_UANZXHIOFH;
// const sign = import.meta.env.VITE_SKDAFNXIU;

// const PrepaidPage = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(`${apiUrl}/price-list`, {
//         cmd: 'prepaid',
//         username: username,
//         code: '',
//         sign: sign
//       });

//       setData(response.data.data);
//     } catch (err) {
//       setError('Terjadi kesalahan saat memuat data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={fetchData}
//         className="bg-blue-500 text-white py-2 px-4 rounded"
//       >
//         Ambil Data
//       </button>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {data && (
//         <div className="mt-4">
//           <h2 className="text-xl font-bold">Data Produk</h2>
//           {data.map((item, index) => (
//             <div key={index} className="border p-4 my-2 rounded">
//               <h3 className="text-lg font-semibold">{item.product_name}</h3>
//               <p><strong>Kategori:</strong> {item.category}</p>
//               <p><strong>Brand:</strong> {item.brand}</p>
//               <p><strong>Jenis:</strong> {item.type}</p>
//               <p><strong>Penjual:</strong> {item.seller_name}</p>
//               <p><strong>Harga:</strong> {item.price}</p>
//               <p><strong>Kode SKU Pembeli:</strong> {item.buyer_sku_code}</p>
//               <p><strong>Status Produk Pembeli:</strong> {item.buyer_product_status ? 'Tersedia' : 'Tidak Tersedia'}</p>
//               <p><strong>Status Produk Penjual:</strong> {item.seller_product_status ? 'Tersedia' : 'Tidak Tersedia'}</p>
//               <p><strong>Stok Tidak Terbatas:</strong> {item.unlimited_stock ? 'Ya' : 'Tidak'}</p>
//               <p><strong>Sisa Stok:</strong> {item.stock}</p>
//               <p><strong>Multi Transaksi:</strong> {item.multi ? 'Ya' : 'Tidak'}</p>
//               <p><strong>Jam Mulai Cut Off:</strong> {item.start_cut_off}</p>
//               <p><strong>Jam Akhir Cut Off:</strong> {item.end_cut_off}</p>
//               <p><strong>Deskripsi:</strong> {item.desc}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrepaidPage;



import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_ANWRNKXYIGS;

const PrepaidPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    console.log("Fetching data from:", apiUrl); // Tambahkan log ini

    try {
      const response = await axios.post(`${apiUrl}/price-list`, {
        cmd: 'prepaid',
        username: 'yitaxig4J76D',
        code: '',
        sign: '4c96f72a53964c6718243f913033a0b6'
      });

      setData(response.data.data);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchData}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Ambil Data
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Data Produk</h2>
          {data.map((item, index) => (
            <div key={index} className="border p-4 my-2 rounded">
              <h3 className="text-lg font-semibold">{item.product_name}</h3>
              <p><strong>Kategori:</strong> {item.category}</p>
              <p><strong>Brand:</strong> {item.brand}</p>
              <p><strong>Jenis:</strong> {item.type}</p>
              <p><strong>Penjual:</strong> {item.seller_name}</p>
              <p><strong>Harga:</strong> Rp {item.price}</p>
              <p><strong>Kode SKU Pembeli:</strong> {item.buyer_sku_code}</p>
              <p><strong>Status Produk Pembeli:</strong> {item.buyer_product_status ? 'Tersedia' : 'Tidak Tersedia'}</p>
              <p><strong>Status Produk Penjual:</strong> {item.seller_product_status ? 'Tersedia' : 'Tidak Tersedia'}</p>
              <p><strong>Stok Tidak Terbatas:</strong> {item.unlimited_stock ? 'Ya' : 'Tidak'}</p>
              <p><strong>Sisa Stok:</strong> {item.stock}</p>
              <p><strong>Multi Transaksi:</strong> {item.multi ? 'Ya' : 'Tidak'}</p>
              <p><strong>Jam Mulai Cut Off:</strong> {item.start_cut_off}</p>
              <p><strong>Jam Akhir Cut Off:</strong> {item.end_cut_off}</p>
              <p><strong>Deskripsi:</strong> {item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrepaidPage;
