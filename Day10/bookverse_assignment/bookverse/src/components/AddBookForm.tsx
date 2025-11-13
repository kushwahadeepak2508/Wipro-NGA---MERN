// src/components/AddBookForm.tsx
import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dispatcher from "../flux/Dispatcher";
import { addBookAction } from "../flux/actions";
import { StoreContext } from "../flux/StoreContext";
import { Book } from "../flux/BookStore";

type Props = {
  // optional callback after successful add
  onAdded?: (book: Book) => void;
};

const AddSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  price: Yup.number().typeError("Price must be a number").required("Price is required"),
  description: Yup.string().optional(),
});

const AddBookForm: React.FC<Props> = ({ onAdded }) => {
  // we can use the store to get current count for generating id, demonstrating DI
  const store = useContext(StoreContext);

  return (
    <div className="card p-3 mb-3">
      <h5>Add New Book</h5>

      <Formik
        initialValues={{ title: "", author: "", price: "", description: "" }}
        validationSchema={AddSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          // generate id based on current store contents (simple approach)
          const current = store.getAll();
          const id = current.length ? Math.max(...current.map((b) => b.id)) + 1 : 1;

          const book: Book = {
            id,
            title: values.title,
            author: values.author,
            price: Number(values.price),
            description: values.description || undefined,
          };

          // Dispatch an action so store processes it through Dispatcher
          Dispatcher.dispatch(addBookAction(book));

          setSubmitting(false);
          resetForm();
          if (onAdded) onAdded(book);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-2">
              <label>Title</label>
              <Field name="title" className="form-control" />
              <div className="text-danger"><ErrorMessage name="title" /></div>
            </div>

            <div className="mb-2">
              <label>Author</label>
              <Field name="author" className="form-control" />
              <div className="text-danger"><ErrorMessage name="author" /></div>
            </div>

            <div className="mb-2">
              <label>Price</label>
              <Field name="price" className="form-control" />
              <div className="text-danger"><ErrorMessage name="price" /></div>
            </div>

            <div className="mb-2">
              <label>Description</label>
              <Field name="description" as="textarea" className="form-control" />
            </div>

            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              Add Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBookForm;
