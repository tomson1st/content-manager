import Layout from "components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ResourceForm from "../../components/ResourceForm";

const ResourceCreate = () => {
  const router = useRouter();

  const createResource = (formData) => {
    axios
      .post("/api/resources", formData)
      .then((res) => {
        router.push("/");
      })
      .catch((err) => {
        alert(err?.response?.data);
      });
  };

  useEffect(() => {
    const nav_items = document.querySelectorAll(".navbar-item");
    nav_items.forEach((item) => {
      item.classList.remove("is-active");
    });

    document.querySelector(".add-link").classList.add("is-active");
  }, []);

  return (
    <Layout>
      <ResourceForm
        pageTitle="Add new resource"
        onFormSubmit={createResource}
      />
    </Layout>
  );
};

export default ResourceCreate;
