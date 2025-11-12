import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useClickAway } from 'react-use';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';
import Logo1 from '../../assets/images/Logo/p1@6x.png';
import Logo2 from '../../assets/images/Logo/p1@6x.png';
import LogoMain from '../../assets/images/logo.webp'

const MAX_SUGGESTIONS = 10;

const MobileNavbar = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [logoIndex, setLogoIndex] = useState(Number(localStorage.getItem('navbarLogoIndex') || 0));
  const [bgColor, setBgColor] = useState(logoIndex === 0 ? '#fff3' : '#ffffff');
  const [iconColor, setIconColor] = useState(logoIndex === 0 ? '#333' : '#000');

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Fetch categories & products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get('https://db.store1920.com/wp-json/wc/v3/products/categories', { params: { per_page: 50, parent: 0 } }),
          axios.get('https://db.store1920.com/wp-json/wc/v3/products', { params: { per_page: 50 } }),
        ]);

        const categories = catRes.data.map(c => ({ id: c.id, name: c.name, slug: c.slug, type: 'category' }));
        const products = prodRes.data.map(p => ({ id: p.id, name: p.name, slug: p.slug, type: 'product' }));

        const combined = [...categories, ...products];
        setItems(combined);
        setSuggestions(combined.slice(0, MAX_SUGGESTIONS));
      } catch (err) {
        console.error('Failed to fetch categories/products:', err);
      }
    };
    fetchData();
  }, []);

  // Hide dropdown when clicking outside
  useClickAway(containerRef, () => setDropdownVisible(false));

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setSuggestions(items.slice(0, MAX_SUGGESTIONS));
        return;
      }
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get('https://db.store1920.com/wp-json/wc/v3/products/categories', { params: { search: searchTerm, per_page: 50 } }),
          axios.get('https://db.store1920.com/wp-json/wc/v3/products', { params: { search: searchTerm, per_page: 50 } }),
        ]);

        const lower = searchTerm.toLowerCase();
        const categories = catRes.data
          .filter(c => c.name.toLowerCase().includes(lower) || c.slug.toLowerCase().includes(lower) || String(c.id) === searchTerm)
          .map(c => ({ id: c.id, name: c.name, slug: c.slug, type: 'category' }));
        const products = prodRes.data
          .filter(p => p.name.toLowerCase().includes(lower) || p.slug.toLowerCase().includes(lower) || String(p.id) === searchTerm)
          .map(p => ({ id: p.id, name: p.name, slug: p.slug, type: 'product' }));

        setSuggestions([...categories, ...products].slice(0, MAX_SUGGESTIONS));
      } catch (err) {
        console.error('Search failed:', err);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm, items]);

  const goToProduct = (slug = null, customLabel = '') => {
    const finalSearch = customLabel || searchTerm;
    if (slug) navigate(`/product/${slug}`);
    else navigate(`/search?q=${encodeURIComponent(finalSearch)}`);
  };

  const handleSelect = item => {
    setDropdownVisible(false);
    if (item.type === 'category') goToProduct(null, item.slug);
    else goToProduct(item.slug);
  };

  // Automatic Logo & Icon Color Cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex(prev => {
        const next = (prev + 1) % 2;
        setBgColor(next === 0 ? '#fff3' : '#ffffff');
        setIconColor(next === 0 ? '#333' : '#000');
        localStorage.setItem('navbarLogoIndex', next);
        return next;
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNavbarClose = () => {
    setDropdownVisible(false);
    setTimeout(() => {
      setLogoIndex(prev => {
        const next = (prev + 1) % 2;
        setBgColor(next === 0 ? '#fff3' : '#ffffff');
        setIconColor(next === 0 ? '#333' : '#000');
        localStorage.setItem('navbarLogoIndex', next);
        return next;
      });
    }, 3000);
  };

  return (
    <nav style={{
      position: 'relative',
      top: 0,
      zIndex: 1000,
      backgroundColor: bgColor,
      display: 'flex',
      alignItems: 'center',
      padding: '8px 12px',
      width: '100%',
      height: 56,
      boxSizing: 'border-box',
      userSelect: 'none'
    }}>
      {/* Logo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={logoIndex === 0 ? LogoMain : LogoMain} alt="Logo" style={{ width: 40, display: 'block', userSelect: 'none' }} draggable={false}/>
        </button>
      </div>

      {/* Search */}
      <div ref={containerRef} style={{
        flex: 6,
        display: 'flex',
        alignItems: 'center',
        background: '#f5f5f5',
        borderRadius: 20,
        padding: '8px 8px',
        margin: '0 10px',
        position: 'relative'
      }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Store1920"
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setDropdownVisible(true); }}
          onFocus={() => setDropdownVisible(true)}
          onKeyDown={e => { if(e.key==='Enter'){ e.preventDefault(); handleNavbarClose(); navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`) } }}
          style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontSize: 13, minWidth: 100, maxWidth: 350 }}
        />
        {searchTerm && <span onClick={() => setSearchTerm('')} style={{ position: 'absolute', right: 30, cursor: 'pointer', fontSize: 18, color: '#999' }}>×</span>}
        <FaSearch style={{ color: '#9E1DAB', marginLeft: 6, cursor: 'pointer' }} onClick={() => { handleNavbarClose(); navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`) }} />
      </div>

      {/* Icons */}
      <div style={{ flex: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/cart')} style={{minWidth:"50px !important",maxWidth:"55px !important", width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}>
          <FaShoppingCart color={iconColor} size={20} />
          {totalQuantity>0 && <span style={{ position:'absolute', top:0, right:-6, background:'red', color:'white', borderRadius:'50%', padding:'2px 0', fontSize:10, fontWeight:'bold', lineHeight:1, minWidth:18, textAlign:'center' }}>{totalQuantity}</span>}
        </button>

        <button onClick={() => navigate('/category')} style={{ width: 32, height: 32, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
          <FaBars color={iconColor} size={20} />
        </button>
      </div>
    </nav>
  );
};

export default MobileNavbar;
