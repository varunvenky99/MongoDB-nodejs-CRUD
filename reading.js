const {MongoClient} = require('mongodb');

async function main(){
        const uri = "mongodb+srv://varun:1234@cluster0.bqgig.mongodb.net/Cluster0?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology:true});
    try{
        await client.connect();

        // await findOneListingByName(client, "Palms")

        await findManyListings(client, {
            minNoBedrooms: 4,
            minNoBathrooms: 2,
            maxNoResults: 5
        })
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

main().catch(console.err);


//reading documents


//findOne

async function findOneListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name : nameOfListing})
    if(result){
        console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    }
    else{
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}





//find()


                async function findManyListings(client, {
                    minNoBedrooms = 0,
                    minNoBathrooms = 0,
                    maxNoResults = Number.MAX_SAFE_INTEGER
                } = {})
                {
                    const cursor =  await client.db("sample_airbnb").collection("listingsAndReviews").find({
                            bedrooms : {$gte : minNoBedrooms},
                            bathrooms : {$gte : minNoBathrooms}
                    })
                    .sort({last_review : -1})
                    .limit(maxNoResults);

                    const results = await cursor.toArray();

                    if(results.length > 0)
                    {
                console.log(`Found listings with atleast ${minNoBedrooms} bedrooms and ${minNoBathrooms} bathrooms`);

                        results.forEach((result,i) => {
                            date = new Date(result.last_review).toDateString();

                            console.log();
                            console.log((`${i+1}. name: ${result.name}`));
                            console.log(`_id: ${result.id}`);
                            console.log(` bedrooms: ${result.bedrooms}`);
                            console.log(` bathrooms: ${result.bathrooms}`);
                            console.log(`Most recent reviw date : ${date}`);
                        })
                    }
                }