import React from 'react'
import { FaCode } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
    checklist: [
        {
            completed: '',
            name: '',
        },
    ],
};

function ChecklistPage() {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                // save to MongoDb
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ values }) => (
                <Form>
                    {/* <Field type="checkbox" name={`checklist.${index}.name`}/> */}
                    <FieldArray name="checklist">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.checklist.length > 0 &&
                                    values.checklist.map((friend, index) => (
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label>
                                                    <Field type="checkbox" name={`checklist.${index}.completed`}/>
                                                </label>
                                                <label htmlFor={`checklist.${index}.name`}> Task </label>
                                                <textarea
                                                    name={`checklist.${index}.name`}
                                                    placeholder="item"
                                                    type="text"
                                                    cols="50"
                                                    rows="1"
                                                />
                                                <ErrorMessage
                                                    name={`checklist.${index}.name`}
                                                    component="div"
                                                    className="field-error"
                                                />
                                                <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => remove(index)}
                                                >
                                                     X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => push({ completed:"false", name: '' })}
                                >
                                    Add Item
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <button type="submit">Save Checklist</button>
                </Form>
            )}
        </Formik>
    )
}

export default ChecklistPage