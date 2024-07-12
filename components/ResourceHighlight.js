import Link from "next/link";
import ResourceLabel from "./ResourceLabel";
import moment from "moment";
const ResourceHighlight = ({ resources }) => {
  return (
    <section className="hero ">
      <div className="hero-body">
        <div className="container">
          {resources.map((resource) => {
            return (
              <section key={resource.id} className="section">
                <div className="columns">
                  <div className="column is-8 is-offset-2">
                    <div className="content is-medium">
                      <h2 className="subtitle is-4 mb-1">
                        {moment(resource.createdAt).format("DD/MM/YYYY")}
                        <ResourceLabel status={resource.status}></ResourceLabel>
                      </h2>
                      <h1 className="title mb-2 mt-2">{resource.title}</h1>
                    
                      <p className="mb-2" > {truncateString(resource.description, 50)}</p>
                      <Link
                        className="button is-lightt"
                        href={`/resources/${resource.id}`}
                      >
                        more details
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
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

export default ResourceHighlight;
