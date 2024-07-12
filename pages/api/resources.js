import axios from "axios";

export default async function (req, res) {

  if (req.method === "GET") {
    const resData = await fetch(`${process.env.API_URL}/resources`);
    const data = await resData.json();
    return res.send(data);
  } else if (req.method === "POST" || req.method === "PATCH") {
    const { id, title, description, link, priority, timeToFinish } = req.body;
    let url = `${process.env.API_URL}/resources`;
    if (!title || !description || !link || !priority || !timeToFinish) {
      return res.status(422).send("Data are Missing");
    }
    

    if (req.method ==='PATCH'){
      url += `/${id}`;
    }

    try {
      const axiosRes = await axios[req.method.toLowerCase()](url, req.body);
      return res.send(axiosRes?.data);
    } catch {
      return res.status(422).send("Data cannot be stored");
    }
  }
}
