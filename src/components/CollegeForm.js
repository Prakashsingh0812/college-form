import React, { useReducer } from 'react';

// Initial state object
const initialState = {
  name: '',
  establishment_year: '',
  address: {
    building: '',
    street: '',
    city: { name: '', locality: { pinCode: '', landmark: '' } },
    state: '',
  },
  coordinates: { latitude: '', longitude: '' },
  courses_offered: [],
};

// Reducer function
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ADDRESS_FIELD':
      return {
        ...state,
        address: { ...state.address, [action.field]: action.value },
      };
    case 'SET_CITY_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          city: { ...state.address.city, [action.field]: action.value },
        },
      };
    case 'SET_LOCALITY_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: { ...state.address.city.locality, [action.field]: action.value },
          },
        },
      };
    case 'ADD_COURSE':
      return {
        ...state,
        courses_offered: [...state.courses_offered, action.value],
      };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
}

export default function CollegeForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_ADDRESS_FIELD', field: name, value });
  };

  const handleCityChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_CITY_FIELD', field: name, value });
  };

  const handleLocalityChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_LOCALITY_FIELD', field: name, value });
  };

  const handleAddCourse = () => {
    const course = prompt('Enter course name:');
    if (course) {
      dispatch({ type: 'ADD_COURSE', value: course });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', state);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>College Form</h2>
      <label>
        College Name:
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Establishment Year:
        <input
          type="text"
          name="establishment_year"
          value={state.establishment_year}
          onChange={handleChange}
        />
      </label>

      <h3>Address</h3>
      <label>
        Building:
        <input
          type="text"
          name="building"
          value={state.address.building}
          onChange={handleAddressChange}
        />
      </label>
      <label>
        Street:
        <input
          type="text"
          name="street"
          value={state.address.street}
          onChange={handleAddressChange}
        />
      </label>

      <h4>City</h4>
      <label>
        City Name:
        <input
          type="text"
          name="name"
          value={state.address.city.name}
          onChange={handleCityChange}
        />
      </label>

      <h4>Locality</h4>
      <label>
        Pin Code:
        <input
          type="text"
          name="pinCode"
          value={state.address.city.locality.pinCode}
          onChange={handleLocalityChange}
        />
      </label>
      <label>
        Landmark:
        <input
          type="text"
          name="landmark"
          value={state.address.city.locality.landmark}
          onChange={handleLocalityChange}
        />
      </label>

      <h4>Coordinates</h4>
      <label>
        Latitude:
        <input
          type="text"
          name="latitude"
          value={state.coordinates.latitude}
          onChange={handleChange}
        />
      </label>
      <label>
        Longitude:
        <input
          type="text"
          name="longitude"
          value={state.coordinates.longitude}
          onChange={handleChange}
        />
      </label>

      <h3>Courses Offered</h3>
      <button type="button" onClick={handleAddCourse}>
        Add Course
      </button>
      <ul>
        {state.courses_offered.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>

      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}
