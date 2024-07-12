import React from "react";
import Layout from "components/Layout";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import ResourceLabel from "components/ResourceLabel";
const ResourceDetail = ({ resource }) => {
  const activeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "active" })
      .then((_) => location.reload())
      .catch((_) => alert("Cannot activate the resource!"));
  };

  const completeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "complete" })
      .then((_) => location.reload())
      .catch((_) => alert("Cannot complete the resource!"));
  };

  const isactive = resource.status === "active";
  const iscomplete = resource.status === "complete";
  return (
    <Layout>
      <section className="hero ">
        <div className="hero-body">
          <div className="container">
            <section className="section">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <div className="content is-medium">
                    <h2 className="subtitle is-4">
                      {" "}
                      {moment(resource.createdAt).format("DD/MM/YYYY")}
                      <ResourceLabel status={resource.status}></ResourceLabel>
                    </h2>
                    <h1 className="title">{resource.title}</h1>

                    <p>{resource.description}</p>
                    <p>Time to finish: {resource.timeToFinish} min</p>
                    <Link disabled={iscomplete} 
                      href={`/resources/${resource.id}/edit`}
                      className="button is-warning"
                    >
                      Update
                    </Link>

                    {isactive ? (
                      <button
                        type="button"
                        className="button is-link ml-1 "
                        onClick={completeResource}
                      >
                        complete
                      </button>
                    ) : (
                      <button
                        disabled={iscomplete}
                        type="button"
                        className="button is-success ml-1 "
                        onClick={activeResource}
                      >
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const resData = await fetch(
    `${process.env.API_URL}/resources/${params.id}`
  );
  const data = await resData.json();

  return {
    props: {
      resource: data,
    },
  };
}

export default ResourceDetail;
