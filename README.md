
**Description**

Travel-project is an API project done for educational purpose. The main goal is to learn how to build REStful API using Node.js, Express and MongoDB. 
The app is using https://www.nps.gov/ data to create three collections in DB: parks, alerts and news. 

**Project link and the API documentation**

 https://tanyasproject.azurewebsites.net/

**Technologies**

HTML, CSS, JavaScript, Express, MongoDB, Mongoose

**How to install**

1.	Fork and clone repository
2.	Swich in project folder in terminal and run
-	`npm init`
-	`npm install` (to install all dependencies)
-	`node db/seed.js` (to seed your database)
3.	Run in terminal `mongoode` to turn on your mongoDB
4.	In a separate terminal window run `nodemone` to turn on your local 
 server
5.	Now you can explore API. Use browser or Postmen to send requests to database.

**What was new or interesting for me**

1. I had a problem collecting data from original API. I wanted to use fetch to collect json data. 
But I need to run fetch couple of times to collect all parks collection data. Since fetch is a asynchronies function
and return a promise, not a data I want, I've learned how to collect promises, aggregate, and receive a json file with all data.
Code exemple:
```
function getJsonParks(url, modelName) {
    let arrayPark = []
    let promises = []
    modelName.deleteMany({}).then(() => {
        for (var i = 0; i <= 500; i += 50) {
            var urlStart = i
            console.log(`${url}${urlStart}`)
            promises.push(
                fetch(`${url}${urlStart}`).then(res => {
                    return res.json()
                }).then(json => {
                    console.log(json.data.length)
                    return json.data
                })
            )
        }  
      Promise.all(promises).then(value =>{
        for (var i=0; i<value.length; i++){
            arrayPark = arrayPark.concat(value[i])
        }
        modelName.create(arrayPark)
    }).catch(e => {console.log(e)})
    })
}
```
2. I've learned how to use `aggregate $lookup` in mongoDB to creating relationships between collections. In my case I have field `parkCode` in all my collections, so I've used it to create relationships between parks, and news/allerts that belong to particular park.

3.  Implementing a query in the URI and use value that was passed in `find()` or `aggregate()` functions to limit the number of documents or start from a certain index of a document.

4. Found out that order is very important for pipeline functions such as aggregate. For exemple `skip` must be before `limit`.
Code exemple:

```router.get("/name/:name", (req, res) => {

    let limit = 5
    let start = 0
    if (req.query.limit) {
        limit = parseInt(req.query.limit, 10)
    }
    if (req.query.page) {
        start = parseInt(req.query.page, 10)
    }
    Parks.aggregate([{
        $lookup: {
            from: "news",
            localField: "parkCode",
            foreignField: "parkCode",
            as: "news"
        }
    },
    {
        $lookup: {
            from: "alerts",
            localField: "parkCode",
            foreignField: "parkCode",
            as: "alerts"
        }
    },
    { $match: { name: req.params.name } },
    { $skip: start },
    { $limit: limit }
    
    ]).then(park => res.json(park))

})```









 
