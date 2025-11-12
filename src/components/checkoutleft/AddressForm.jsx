import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import CustomMap from '../../components/checkoutleft/CustomMap';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../utils/firebase';

const LOCAL_STORAGE_KEY = 'checkoutAddressData';

const UAE_EMIRATES = [
  { code: 'ABU', name: 'Abu Dhabi' },
  { code: 'DXB', name: 'Dubai' },
  { code: 'SHJ', name: 'Sharjah' },
  { code: 'AJM', name: 'Ajman' },
  { code: 'UAQ', name: 'Umm Al Quwain' },
  { code: 'RAK', name: 'Ras Al Khaimah' },
  { code: 'FSH', name: 'Fujairah' },
];

const UAE_CITIES = {
  ABU: ['Abu Dhabi', 'Al Ain', 'Madinat Zayed', 'Sweihan', 'Liwa Oasis', 'Ruways', 'Ghayathi', 'Jebel Dhanna', 'Al Yahar', 'Al Khazna', 'Al Mahdar', 'Al Falah', 'Al Shuwaib', 'Al Rafaah', 'Al Salamah', 'Al Hayer', 'Al Khari', 'Al Ghashban', 'Al Ghabah', 'Al Fara\'', 'Al Fulayyah', 'Al Awdah', 'Al Ghabam', 'Al Hamraniyah', 'Al Hamriyah', 'Al Haybah', 'Al Hayl', 'Al Hayr', 'Al Hayrah', 'Al Hulaylah', 'Al Jaddah', 'Al Khashfah', 'Al Mahamm', 'Al Masafirah', 'Al Mataf', 'Al Mu\'amurah', 'Al Naslah', 'Al Qir', 'Al Quwayz', 'Al Usayli', 'Khalifa City', 'Shakhbout City', 'Corniche', 'Mussafah', 'Reem Island', 'Yas Island', 'Saadiyat Island'],
  DXB: ['Dubai', 'Deira', 'Bur Dubai', 'Jebel Ali', 'Al Barsha', 'Al Quoz', 'Al Safa', 'Dubai Marina', 'Jumeirah', 'Satwa', 'Al Karama', 'Al Nahda', 'Al Qusais', 'Al Rashidiya', 'Al Jaddaf', 'Al Khawaneej', 'Al Warqa', 'Al Muhaisnah', 'Al Mizhar', 'Al Garhoud', 'Al Satwa', 'Business Bay', 'Mirdif', 'Jumeirah Beach Residences', 'International City', 'Discovery Gardens', 'Dubai Silicon Oasis', 'Dubai Investment Park', 'Dubai Festival City', 'Downtown Dubai', 'Palm Jumeirah', 'Jumeirah Lakes Towers (JLT)', 'DIFC', 'Emirates Towers', 'Trade Centre 2', 'Sheikh Zayed Road', 'Al Sufouh', 'Dubai Sports City', 'Dubai Hills Estate', 'Al Barsha South', 'Dubai Industrial City'],
  SHJ: ['Sharjah', 'Al Dhaid', 'Khor Fakkan', 'Kalba', 'Mleiha', 'Al Hamriyah', 'Al Madam', 'Al Bataeh', 'Al Khan', 'Al Layyah', 'Al Yarmook', 'Industrial Area', 'Sharjah City Center', 'University City', 'Al Nahda'],
  AJM: ['Ajman', 'Masfout', 'Manama', 'Al Jurf', 'Al Rashidiya', 'Al Nuaimia', 'Al Rawda', 'Al Rumailah', 'Al Mowaihat', 'Al Tallah', 'Al Sheikh Maktoum', 'Al Hamidiyah'],
  UAQ: ['Umm Al Quwain', 'Falaj Al Mualla', 'Al Sinniyah', 'Al Rumailah', 'Al Kharran', 'Al Jurf', 'Al Rahbah', 'Al Raas', 'Al Tallah', 'Al Bu Falah', 'Al Qawasim'],
  RAK: ['Ras Al Khaimah', 'Dibba Al-Hisn', 'Khatt', 'Al Jazirah Al Hamra', 'Al Rams', 'Dhayah', 'Ghalilah', 'Al Nakheel', 'Al Hamra Village', 'Al Nakheel Industrial', 'Al Qusaidat', 'Al Maarid', 'Al Hudaibah'],
  FSH: ['Fujairah', 'Dibba Al-Fujairah', 'Khor Fakkan', 'Masafi', 'Bidiyah', 'Dibba Al-Hisn', 'Al Aqah', 'Al Bithnah', 'Al Faseel', 'Al Hala', 'Al Madhah', 'Al Sharqiyah', 'Al Sakamkam', 'Al Twar', 'Al Jurf']
};

const AddressForm = ({ formData, onChange, onSubmit, onClose, saving, error, cartItems }) => {
  const [formErrors, setFormErrors] = useState({});
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapSelected, setMapSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --------------------------
  // Load saved address
  // --------------------------
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.shipping) {
          Object.keys(data.shipping).forEach((key) =>
            onChange({ target: { name: key, value: data.shipping[key] } }, 'shipping')
          );
        }
        if (data.saveAsDefault !== undefined) {
          onChange({ target: { name: 'saveAsDefault', value: data.saveAsDefault } });
        }
      } catch (err) {
        console.warn('Failed to parse saved checkout address:', err);
      }
    }
  }, []);

  // --------------------------
  // Validation Logic
  // --------------------------
  const validateField = (name, value) => {
    switch (name) {
      case 'first_name':
      case 'last_name':
      case 'street':
      case 'city':
      case 'state':
        if (!value || value.trim() === '') return 'This field is required';
        break;
      case 'phone_number':
        if (!value || value.trim() === '') return 'Phone number is required';
        if (value.length < 12) return 'Invalid phone number';
        break;
      case 'email':
        if (!value || !/\S+@\S+\.\S+/.test(value)) return 'Invalid email';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleFieldChange = (e) => {
    onChange(e, 'shipping');
    const errorMsg = validateField(e.target.name, e.target.value);
    setFormErrors((prev) => ({ ...prev, [e.target.name]: errorMsg }));
  };

  // --------------------------
  // PHONE FIX: reliable update
  // --------------------------
  const handlePhoneChange = (phone) => {
    const normalizedPhone = phone.replace(/\D/g, '');
    onChange({ target: { name: 'phone_number', value: normalizedPhone } }, 'shipping');
    const errorMsg = validateField('phone_number', normalizedPhone);
    setFormErrors((prev) => ({ ...prev, phone_number: errorMsg }));
  };

  // --------------------------
  // Handle Map Selection
  // --------------------------
  const handlePlaceSelected = ({ street, city, state, lat, lng }) => {
    const stateObj = UAE_EMIRATES.find((s) => s.name.toLowerCase() === state?.toLowerCase());
    const stateCode = stateObj ? stateObj.code : '';
    onChange({ target: { name: 'street', value: street } }, 'shipping');
    onChange({ target: { name: 'city', value: city } }, 'shipping');
    onChange({ target: { name: 'state', value: stateCode } }, 'shipping');
    setMarkerPosition({ lat, lng });
    setMapSelected(true);
  };

  // --------------------------
  // SAVE ADDRESS (fixed)
  // --------------------------
  const saveAddress = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double clicks
    setIsSubmitting(true);

    // Force fresh phone validation (fixes "971" issue)
    const phone = formData.shipping.phone_number?.trim() || '';
    if (!phone || phone.length < 12) {
      alert('Please enter a valid phone number before submitting.');
      setFormErrors((prev) => ({ ...prev, phone_number: 'Invalid or incomplete phone number' }));
      setIsSubmitting(false);
      return;
    }

    const errors = {};
    const requiredFields = ['first_name', 'last_name', 'email', 'phone_number', 'street', 'state', 'city'];
    requiredFields.forEach((field) => {
      const errorMsg = validateField(field, formData.shipping[field]);
      if (errorMsg) errors[field] = errorMsg;
    });

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      alert('Please fill all required fields correctly.');
      setIsSubmitting(false);
      return;
    }

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));

      const payload = {
        ...formData,
        cart: cartItems?.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
      };

      // small delay to ensure react-phone-input updates last digit
      await new Promise((res) => setTimeout(res, 200));

     const res = await fetch('https://db.store1920.com/wp-json/abandoned-checkouts/v1/save', {
      method: 'POST',
       headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
       shipping: formData.shipping,
       cart: cartItems.map((item) => ({
       id: item.id,
       name: item.name,
       quantity: item.quantity,
       price: item.price,
       subtotal: item.price * item.quantity,
     })),
   }),
 });


      const result = await res.json();
      console.log('Saved to WordPress:', result);
      onSubmit(formData);
    } catch (err) {
      console.error('Failed to save address', err);
      alert('Something went wrong while saving your address.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------
  // RENDER
  // --------------------------
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '12px',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: '#fff',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '650px',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '25px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '22px',
            fontWeight: 600,
            cursor: 'pointer',
            color: '#555',
          }}
        >
          ✕
        </button>

        <h2 style={{ marginBottom: '15px', fontSize: '1.5rem', fontWeight: 700, color: '#333' }}>
          Shipping Address
        </h2>

        <CustomMap initialPosition={markerPosition} onPlaceSelected={handlePlaceSelected} />

        {mapSelected && (
          <form onSubmit={saveAddress} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '18px' }}>
              <label>
                First Name*
                <input type="text" name="first_name" value={formData.shipping.first_name} onChange={handleFieldChange} />
                {formErrors.first_name && <span style={{ color: 'red' }}>{formErrors.first_name}</span>}
              </label>

              <label>
                Last Name*
                <input type="text" name="last_name" value={formData.shipping.last_name} onChange={handleFieldChange} />
                {formErrors.last_name && <span style={{ color: 'red' }}>{formErrors.last_name}</span>}
              </label>

              <label>
                Phone Number*
                <PhoneInput
                  country="ae"
                  value={formData.shipping.phone_number || '971'}
                  onChange={handlePhoneChange}
                  containerStyle={{ width: '100%' }}
                  inputStyle={{ width: '100%', height: '42px', borderRadius: '6px', border: '1px solid #ccc', paddingLeft: '48px' }}
                  buttonStyle={{ pointerEvents: 'none', backgroundColor: '#fff' }}
                  enableSearch={false}
                  countryCodeEditable={false}
                  disableDropdown={true}
                />
                {formErrors.phone_number && <span style={{ color: 'red' }}>{formErrors.phone_number}</span>}
              </label>

        

              <label style={{ display: 'flex', flexDirection: 'column', fontWeight: 500, color: '#444' }}> 
               Email*
                <input type="email" name="email" value={formData.shipping.email} onChange={handleFieldChange} 
                style={{ marginTop: '6px', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' }} />
                 {formErrors.email && <span style={{ color: 'red', fontSize: '0.85rem' }}>{formErrors.email}</span>} 
                 </label>
              <label>
                Street*
                <input type="text" name="street" value={formData.shipping.street} onChange={handleFieldChange} />
                {formErrors.street && <span style={{ color: 'red' }}>{formErrors.street}</span>}
              </label>

              <label>
                Apartment / Floor
                <input type="text" name="apartment" value={formData.shipping.apartment} onChange={handleFieldChange} />
              </label>

              <label>
                Province / Emirates*
                <select name="state" value={formData.shipping.state} onChange={handleFieldChange}>
                  <option value="">Select state</option>
                  {UAE_EMIRATES.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {formErrors.state && <span style={{ color: 'red' }}>{formErrors.state}</span>}
              </label>

              <label>
                City / Area*
                <select name="city" value={formData.shipping.city} onChange={handleFieldChange}>
                  <option value="">Select city</option>
                  {UAE_CITIES[formData.shipping.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {formErrors.city && <span style={{ color: 'red' }}>{formErrors.city}</span>}
              </label>

              <label>
                Country
                <input type="text" value="United Arab Emirates" readOnly />
              </label>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                name="saveAsDefault"
                checked={formData.saveAsDefault || false}
                onChange={(e) => onChange({ target: { name: 'saveAsDefault', value: e.target.checked } })}
              />
              Save this address as default for future orders
            </label>

            {error && <div style={{ color: 'red', fontWeight: 600 }}>{error}</div>}

            <button
              type="submit"
              disabled={isSubmitting || saving}
              style={{
                backgroundColor: '#ff5100',
                color: '#fff',
                padding: '12px 22px',
                fontSize: '1.1rem',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
