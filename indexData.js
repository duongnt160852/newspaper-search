const fs = require('fs')

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

const body = {
    "settings": {
        "analysis": {
            "filter": {
                "autocomplete_filter": {
                    "type": "edge_ngram",
                    "min_gram": "1",
                    "max_gram": "10"
                }
            },
            "analyzer": {
                "autocomplete": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "icu_folding",
                        "autocomplete_filter"
                    ]
                },
                "vi_analyzer": {
                    "type": "custom",
                    "tokenizer": "vi_tokenizer",
                    "filter": [
                        "icu_folding"
                    ]
                },
                "icu_analyzer": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "icu_folding",
                        "lowercase"
                    ]
                },
                "description_analyzer": {
                    "type": "custom",
                    "tokenizer": "vi_tokenizer",
                    "filter": [
                        "lowercase"
                    ],
                    "char_filter": [
                        "html_strip"
                    ]
                },
                "my_analyzer":{
                    "tokenizer": "vi_tokenizer",
                    "char_filter":  [ "html_strip" ],
                    "filter": [
                      "icu_folding"
                    ]
                  }
            }
        }
    },
    "mappings": {
        "properties": {
            "content": {
                "type": "text",
                "fields": {
                    "icu": {
                        "type": "text",
                        "analyzer": "icu_analyzer"
                    },
                    "std": {
                        "type": "text",
                        "analyzer": "standard"
                    },
                    "vi": {
                        "type": "text",
                        "analyzer": "vi_analyzer"
                    },
                    "keyword": {
                        "type": "keyword"
                    }
                },
                "analyzer": "autocomplete",
                "search_analyzer": "icu_analyzer"
            },
            "title": {
                "type": "text",
            },
            "description": {
                "type": "text"
            },
            "category": {
                "type": "keyword"
            },
        }
    }
}

client.indices.create({
    index: "newspaper1",
    body
})
    .then(res => console.log(res))
    .catch(err => console.log(err))

let data = []
const readStream = fs.createReadStream("./data.json")
const lineReader = require('readline').createInterface({
    input: readStream
});

lineReader.on('line', async function (line) {
    let body = JSON.parse(line.trim())
    switch (body.category) {
        case "doisong":
            body.category = "đời sống"
            break;
        case "dulich":
            body.category = "du lịch"
            break;
        case "giaitri":
            body.category = "giải trí"
            break;
        case "giaoduc":
            body.category = "giáo dục"
            break;
        case "khoahoc":
            body.category = "khoa học"
            break;
        case "kinhdoanh":
            body.category = "kinh doanh"
            break;
        case "phapluat":
            body.category = "pháp luật"
            break;
        case "sohoa":
            body.category = "số hóa"
            break;
        case "suckhoe":
            body.category = "sức khỏe"
            break;
        case "thegioi":
            body.category = "thế giới"
            break;
        case "thethao":
            body.category = "thể thao"
            break;
        case "thoisu":
            body.category = "thời sự"
            break;
        default:
            break;
    }
    data.push(body)
}).on("close", async function () {
    console.log(data.length)
    const body = data.flatMap(doc => [{ index: { _index: 'newspaper1' } }, doc])
    let idx = 0
    while(idx < body.length){
        const temp = body.slice(idx,idx+100)
        console.log(idx)
        await client.bulk({ refresh: true, body: temp })
        idx=idx+100
    }
})
