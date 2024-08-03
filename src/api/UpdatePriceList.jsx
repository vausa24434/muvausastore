import fetch from 'node-fetch';
import { supabase } from '../../client'; // Path ke file client.js

// API dan kredensial
const apiUrl = process.env.VITE_ANWRNKXYIGS; // Diganti dengan URL API Anda
const username = process.env.VITE_UANZXHIOFH; // Diganti dengan Username Anda
const sign = process.env.VITE_SKDAFNXIU; // Diganti dengan Signature Anda

export default async function handler(req, res) {
  try {
    // Fetch data dari API eksternal
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

    if (Array.isArray(data.data)) {
      const uniqueProducts = new Map();

      data.data.forEach((product) => {
        const key = `${product.product_name}-${product.category}-${product.brand}`;
        if (!uniqueProducts.has(key)) {
          uniqueProducts.set(key, product);
        }
      });

      const uniqueProductList = Array.from(uniqueProducts.values());

      for (const product of uniqueProductList) {
        const { error } = await supabase
          .from('price_list')
          .upsert(
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
        }
      }
    } else {
      console.error('Data received is not an array:', data.data);
    }

    res.status(200).json({ message: 'Price list updated successfully' });
  } catch (error) {
    console.error('Error fetching price list:', error);
    res.status(500).json({ error: error.message });
  }
}
