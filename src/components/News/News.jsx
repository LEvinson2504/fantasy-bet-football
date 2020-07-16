import React, { useState, useEffect } from "react";
import styles from "./News.module.css";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getLatesNews } from "../../api";

function Article({ data }) {
  const { title, story } = data;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{story}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const News = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function getData() {
      getLatesNews().then((fetchedData) => setArticles(fetchedData));
    }
    getData();
  }, []);
  console.log(articles);
  return (
    <div>
      {articles.map((article) => (
        <Article data={article} key={article.title} />
      ))}
    </div>
  );
};

export default News;
