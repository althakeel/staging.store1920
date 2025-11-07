import React, { useState } from 'react';
import axios from 'axios';

const CategoryDebugger = () => {
  const [testSlug, setTestSlug] = useState('automotive-motorcycle');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const testCategory = async () => {
    setLoading(true);
    setResults(null);

    try {
      const tests = [
        {
          name: 'Custom Endpoint',
          url: `https://db.store1920.com/wp-json/store1920/v1/category/${testSlug}`,
          method: 'GET'
        },
        {
          name: 'Standard WooCommerce API',
          url: `https://db.store1920.com/wp-json/wc/v3/products/categories`,
          method: 'GET',
          params: {
            slug: testSlug,
            consumer_key: 'ck_f44feff81d804619a052d7bbdded7153a1f45bdd',
            consumer_secret: 'cs_92458ba6ab5458347082acc6681560911a9e993d'
          }
        },
        {
          name: 'Debug Categories List',
          url: `https://db.store1920.com/wp-json/custom/v1/categories/debug`,
          method: 'GET'
        }
      ];

      const testResults = [];

      for (const test of tests) {
        try {
          console.log(`Testing: ${test.name}`);
          const response = test.params 
            ? await axios.get(test.url, { params: test.params })
            : await axios.get(test.url);
          
          testResults.push({
            name: test.name,
            success: true,
            status: response.status,
            data: response.data
          });
          
          // If this is a category test and it succeeded, try to fetch products
          if ((test.name.includes('Custom') || test.name.includes('Standard')) && response.data) {
            const categoryId = test.name.includes('Custom') 
              ? response.data.id 
              : (response.data.length > 0 ? response.data[0].id : null);
            
            if (categoryId) {
              try {
                const productsResponse = await axios.get('https://db.store1920.com/wp-json/wc/v3/products', {
                  params: {
                    category: categoryId,
                    per_page: 5,
                    consumer_key: 'ck_f44feff81d804619a052d7bbdded7153a1f45bdd',
                    consumer_secret: 'cs_92458ba6ab5458347082acc6681560911a9e993d'
                  }
                });
                
                testResults.push({
                  name: `${test.name} - Products`,
                  success: true,
                  status: productsResponse.status,
                  data: {
                    count: productsResponse.data.length,
                    products: productsResponse.data.map(p => ({
                      id: p.id,
                      name: p.name,
                      price: p.price
                    }))
                  }
                });
              } catch (prodError) {
                testResults.push({
                  name: `${test.name} - Products`,
                  success: false,
                  error: prodError.message,
                  details: prodError.response?.data
                });
              }
            }
          }
          
        } catch (error) {
          testResults.push({
            name: test.name,
            success: false,
            error: error.message,
            status: error.response?.status,
            details: error.response?.data
          });
        }
      }

      setResults(testResults);
    } catch (error) {
      setResults([{ name: 'General Error', success: false, error: error.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>Category API Debugger</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={testSlug} 
          onChange={(e) => setTestSlug(e.target.value)}
          placeholder="Enter category slug"
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button 
          onClick={testCategory} 
          disabled={loading}
          style={{ padding: '8px 16px', backgroundColor: '#007cba', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Testing...' : 'Test Category'}
        </button>
      </div>

      {results && (
        <div>
          {results.map((result, index) => (
            <div key={index} style={{ 
              marginBottom: '20px', 
              padding: '15px', 
              border: `2px solid ${result.success ? 'green' : 'red'}`,
              borderRadius: '5px',
              backgroundColor: result.success ? '#f0f8f0' : '#f8f0f0'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: result.success ? 'green' : 'red' }}>
                {result.name} {result.success ? '✅' : '❌'}
              </h3>
              
              {result.status && <p><strong>Status:</strong> {result.status}</p>}
              
              {result.success ? (
                <pre style={{ 
                  backgroundColor: 'white', 
                  padding: '10px', 
                  borderRadius: '3px',
                  overflow: 'auto',
                  maxHeight: '300px'
                }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              ) : (
                <div>
                  <p><strong>Error:</strong> {result.error}</p>
                  {result.details && (
                    <pre style={{ 
                      backgroundColor: 'white', 
                      padding: '10px', 
                      borderRadius: '3px',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}>
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDebugger;