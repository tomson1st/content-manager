import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
const ActiveResource = () => {
  const [resource, setResource] = useState({});
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    const fecthActiveResource = async () => {
      const response = await axios.get("/api/activeresource");
      const data = response.data;

      const timeToFinish = parseInt(data.timeToFinish, 10);

      const elapsedTime = moment().diff(moment(data.activationTime), "seconds");

      const timeLeft = timeToFinish * 60 - elapsedTime;

      if (timeLeft > 1) {
        setSeconds(timeLeft);
        //data.timeToFinish = timeLeft;
      }
      setResource(data);
    };
    fecthActiveResource();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    if (seconds < 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const completeResource = () => {
    axios
      .patch("/api/resources", { ...resource, status: "complete" })
      .then((_) => location.reload())
      .catch((_) => alert("Cannot complete the resource!"));
  };

  const hasResource = resource && resource.id;

  return (
    <div className="active-resource">
      <h1 className="resource-name">
        {hasResource ? resource.title : "No active resource"}
      </h1>
      <div className="time-wrapper">
        {hasResource &&
          (seconds > 0 ? (
            <h2 className="elapsed-time">{seconds}</h2>
          ) : (
            <h2 className="elapsed-time">
              <button className="button is-success" onClick={completeResource}>
                Click to complete
              </button>
            </h2>
          ))}
      </div>
      {hasResource ? (
        <Link href={`/resources/${resource.id}`} className="button">
          Go to resource
        </Link>
      ) : (
        <Link href="/" className="button">
          Go to resources
        </Link>
      )}
    </div>
  );
};

export default ActiveResource;
