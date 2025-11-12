// BookingForm.js
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useSubmitBooking from '../hooks/useSubmitBooking';
import { BookingContext } from '../context/BookingContext';

/**
 * Booking form fields:
 * - fullName, email, packageId, date, guests, notes
 * - packageId can be selected or entered
 *
 * The form uses Formik (controlled) and Yup for validation.
 */

const BookingSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Too short').max(100, 'Too long').required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  packageId: Yup.string().required('Select a package'),
  date: Yup.date().min(new Date(), 'Date must be in the future').required('Travel date is required'),
  guests: Yup.number().min(1, 'At least 1 guest').max(20, 'Too many guests').required('Number of guests is required'),
  notes: Yup.string().max(500, 'Notes too long').nullable(),
});

export default function BookingForm({ initialPackageId = '' }) {
  const { submitBooking, loading, result, error } = useSubmitBooking();
  const { error: contextError } = useContext(BookingContext);

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Book a Travel Package</h4>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          packageId: initialPackageId,
          date: '',
          guests: 1,
          notes: '',
        }}
        validationSchema={BookingSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
          try {
            await submitBooking(values);
            setSubmitting(false);
            resetForm();
            // optionally show success message — result is available from hook
          } catch (e) {
            // Show field-level or form-level error
            setErrors({ submit: 'Failed to submit booking. Please try again.' });
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form noValidate>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <Field name="fullName" className="form-control" placeholder="Your full name" />
              <div className="text-danger small"><ErrorMessage name="fullName" /></div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <Field name="email" type="email" className="form-control" placeholder="you@example.com" />
              <div className="text-danger small"><ErrorMessage name="email" /></div>
            </div>

            {/* Package select */}
            <div className="mb-3">
              <label className="form-label">Package</label>
              <Field as="select" name="packageId" className="form-select">
                <option value="">-- Choose a package --</option>
                <option value="1">Paris Explorer</option>
                <option value="2">Bali Getaway</option>
                <option value="3">New York Adventure</option>
              </Field>
              <div className="text-danger small"><ErrorMessage name="packageId" /></div>
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Travel Date</label>
              <Field name="date" type="date" className="form-control" />
              <div className="text-danger small"><ErrorMessage name="date" /></div>
            </div>

            {/* Guests */}
            <div className="mb-3">
              <label className="form-label">Guests</label>
              <Field name="guests" type="number" min="1" className="form-control" />
              <div className="text-danger small"><ErrorMessage name="guests" /></div>
            </div>

            {/* Notes */}
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <Field name="notes" as="textarea" className="form-control" rows="3" placeholder="Any special requests?" />
              <div className="text-danger small"><ErrorMessage name="notes" /></div>
            </div>

            {/* Form-level submit error */}
            {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}
            {(error || contextError) && <div className="alert alert-danger">{error || contextError}</div>}

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting || loading}>
                {isSubmitting || loading ? 'Submitting...' : 'Confirm Booking'}
              </button>

              <button type="reset" className="btn btn-outline-secondary">Reset</button>
            </div>

            {/* Success message */}
            {result && (
              <div className="alert alert-success mt-3">
                Booking successful! ID: {result.id}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
