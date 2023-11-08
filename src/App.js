import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import   './FormValidation.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  gender: yup.string().required('Gender is required'),
  country: yup.string().required('Please select a country').notOneOf(['default'], 'Please select a country'),
});

function FormValidationWithYup() {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name:</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input type="text" {...field} />
            )}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input type="email" {...field} />
            )}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="radio"
                  value="male"
                  {...field}
                />{' '}
                Male
                <input
                  type="radio"
                  value="female"
                  {...field}
                />{' '}
                Female
              </div>
            )}
          />
          {errors.gender && <span className="error-message">{errors.gender.message}</span>}
        </div>

        <div className="form-group">
          <label>Country:</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="default">Select a country</option>
                <option value="us">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
              </select>
            )}
          />
          {errors.country && <span className="error-message">{errors.country.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormValidationWithYup;

