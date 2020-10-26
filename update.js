const {MongoClient} = require('mongodb');

async function main(){
        const uri = "mongodb+srv://varun:1234@cluster0.bqgig.mongodb.net/Cluster0?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology:true});
    try{
        await client.connect();
        // await findOneListingByName(client, "Infinite Views")

        // await updateListingByName(client,"Infinite Views", {bedrooms: 10, beds: 7, pool: 1});
        // await findOneListingByName(client, "Infinite Views")

        await updateAllListings(client);
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

main().catch(console.err);

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


//updateOne

async function updateListingByName(client, nameOfListing, updateListing)
{
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne(
        {name: nameOfListing },
        {$set : updateListing }
    );
    console.log(`${result.matchedCount} documets were matched with this query criteria`);
    console.log(`${result.modifiedCount} documents were updated`);
}


async function updateAllListings(client){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany(
        {property_type : {$exists: false}},
        {$set : {property_type : "Unknown"}}
    )

    console.log(`${result.matchedCount} document matched the criteria`);
    console.log(`${result.modifiedCount} documents were updated`);
}