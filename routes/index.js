var express = require('express');
var router = express.Router();

const paginate = require('jw-paginate');
const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })
client.ping(
  function (error) {
    if (error) {
      console.error(error)
    } else {
      console.log("Success connect to Elastic Search!")
    }
  }
);


router.post("/search", async (req, res, next) => {
  const { page, query, category } = req.body

  const body = {
    "query": {
      "bool": {

      }
    },
    "size": 10,
    "from": (page - 1) * 10,
    "_source": ["title", "description"]
  }

  if (query !== "") {
    body['query']['bool']['must'] = [{ "match": { "content": query } }]
    body['query']['bool']['should'] = []
    body['query']['bool']['should'].push({ "match": { "content.icu": query } })
    body['query']['bool']['should'].push({ "match": { "content.std": query } })
    body['query']['bool']['should'].push({ "match": { "content.vi": query } })
  }

  if (Object.values(category).includes(true)) {
    let temp = []
    for (key in category) {
      if (category[key] === true) temp.push(key)
    }
    body['query']['bool']['filter'] = { "terms": { "category": temp } }
  }

  const result = await client.search({ index: "newspaper1", body })
  const items = result.body.hits

  let pager = paginate(items.total.value, page, 10, 5);

  const pageOfItems = items.hits;

  res.send({ pager, pageOfItems });
})

router.post("/newspaper", async (req, res, next) => {
  const { id } = req.body
  const body = {
    query: {
      match: {
        _id: id
      }
    }
  }
  const result = await client.search({ index: "newspaper1", body })
  res.send(result.body.hits.hits[0])
})

module.exports = router;
