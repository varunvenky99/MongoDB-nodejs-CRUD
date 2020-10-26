const {MongoClient} = require('mongodb');

async function main(){
        const uri = "mongodb+srv://varun:1234@cluster0.bqgig.mongodb.net/Cluster0?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology:true});
    try{
        await client.connect();
        // await deleteOneListing(client, "Palms and springs")

        await deleteManyListings(client, new Date("2019-02-15"))
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

main().catch(console.err);


async function deleteOneListing(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({name : nameOfListing });
    console.log(`${result.deletedCount} documents was deleted`);
}

async function deleteManyListings(client,date){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany(
        {"last_scraped": {$lt: date}})

        console.log(`${result.deletedCount} documents were deleted`);
}