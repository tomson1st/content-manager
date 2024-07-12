import React, { useState, useEffect } from "react";
import ResourceHighlight from "components/ResourceHighlight";
import NewsLetter from "components/NewsLetter";
import ResourceList from "components/ResourceList";
import Footer from "components/Footer";
import Layout from "components/Layout";
//import resources from "pages/api/data.json";
//HOME
function Home({ resources }) {


  return (
    <Layout>
      <ResourceHighlight resources={resources.slice(0, 2)} />

      <NewsLetter />

      <ResourceList resources={resources} />

      <Footer />
    </Layout>
  );
}

//is called every time you will visit the page
// function is executed on the server
// data are always fresh
export async function getServerSideProps() {
  const resData = await fetch("http://localhost:3000/api/resources");
  const data = await resData.json();

  return {
    props: {
      resources: data,
    },
  };
}


export default Home;
