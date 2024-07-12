import Link from "next/link";
import moment from "moment";
import ResourceLabel from "./ResourceLabel";
const ResourceList = ({ resources }) => {
  const renderResources = () =>
    resources.map((resource) => (
      <div key={resource.id} className="column is-5 is-offset-1 ">
        <div className="content is-medium">
          <h2 className="subtitle is-5 has-text-grey">
          {moment(resource.createdAt).format("DD/MM/YYYY")}
            <ResourceLabel status={resource.status}></ResourceLabel>
          </h2>
          <h1 className="title has-text-black is-3 mb-2 mt-2">{resource.title}</h1>

          <p className="has-text-dark mb-2">
            {truncateString(resource.description, 50)}
          </p>
          <Link className="button is-light" href={`/resources/${resource.id}`}>
            more details
          </Link>
        </div>
      </div>
    ));

  return (
    <section className="hero ">
      <div className="hero-body">
        <div className="container">
          <section className="section">
            <div className="columns is-multiline is-variable is-8">
              {renderResources()}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  } else {
    return str;
  }
}
export default ResourceList;
