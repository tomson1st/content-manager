import React from "react";
import { useEffect, useState } from "react";
const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: 2,
  timeToFinish: 60,
};

const ResourceForm = ({ onFormSubmit, pageTitle, initialData }) => {
  const [form, setFrom] = useState(initialData || DEFAULT_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrom({ ...form, [name]: value });
  };

  const resetForm = () => setFrom(DEFAULT_DATA);

  const submitForm = () => {
    onFormSubmit(form);
  };

const resourceDisabled = (form.status === "complete" || form.status === "active");

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-8 is-offset-2 ">
          <div className="resource-form">
            <h1 className="title">{pageTitle} </h1>
            <p className={`status ${form.status}`}>{form.status}</p>
            <form className="box">
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input disabled={resourceDisabled}
                    name="title"
                    onChange={handleChange}
                    value={form.title}
                    className="input"
                    type="text"
                    placeholder="Title"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea  disabled={resourceDisabled}
                    name="description"
                    onChange={handleChange}
                    value={form.description}
                    className="textarea"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>

              <div className="field">
                <label className="label">Link</label>
                <div className="control">
                  <input  disabled={resourceDisabled}
                    name="link"
                    onChange={handleChange}
                    value={form.link}
                    className="input"
                    type="text"
                    placeholder="Link"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Priority</label>
                <div className="control">
                  <div className="select">
                    <select  disabled={resourceDisabled}
                      value={form.priority}
                      name="priority"
                      onChange={handleChange}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Time To Finish</label>
                <div className="control">
                  <input  disabled={resourceDisabled}
                    name="timeToFinish"
                    onChange={handleChange}
                    value={form.timeToFinish}
                    className="input"
                    type="number"
                    placeholder="Time To Finish in minutes"
                  />
                </div>
                <p className="help">Time in minutes</p>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    type="button"
                    onClick={submitForm}
                    className="button is-link"
                  >
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button  disabled={resourceDisabled}
                    type="button"
                    onClick={resetForm}
                    className="button is-link is-light"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ResourceForm;
