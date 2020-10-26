const {MongoClient} = require('mongodb');

async function main(){
        const uri = "mongodb+srv://varun:1234@cluster0.bqgig.mongodb.net/Cluster0?retryWrites=true&w=majority";
        const client = new MongoClient(uri, {useNewUrlParser : true, useUnifiedTopology:true});
    try{
        await client.connect();
        // await listDatabases(client)

     //   insertOne call

        // await createListing(client, 
        //     {
        //         name : "Lovely Loft",
        //         summary : "A beautiful loft in London",
        //         bedrooms : 2,
        //         bathrooms : 2
        // })


        //InsertMany call

        await createMultipleListing(client , [
            {
                name : "Infinite Views",
                summary : "A modern house with an infinity pool",
                property_type : "House",
                bedrooms : 5,
                bathrooms : 4.5
            },
            {
                name : "Private room in Mumbai",
                summary : "A modern house in Mumbai",
                property_type : "House",
                bedrooms : 2,
                bathrooms : 2
            },
            {
                name : "Private room in Bangalore",
                summary : "A modern house with in Bangalore",
                property_type : "Apartment",
                bedrooms : 1,
                bathrooms : 1
            },
            {
                name : "Palms and springs",
                summary : "Relaxed beach living with a private beach",
                property_type : "Beach House",
                bedrooms : 6,
                bathrooms : 6
            }
        ])


    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }
}

main().catch(console.err);


async function listDatabases(client){
        const result = await client.db().admin().listDatabases();
        console.log("DataBases : ");
        result.databases.forEach(db => console.log(`- ${db.name}`) )
}



//insertOne

async function createListing(client, newListing /*This will be a document that will send to mongodb to insert */)
{
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(result);
    console.log(`New listing has been created with the following id: ${result.insertedId}`);
}

//insertMany

async function createMultipleListing(client, newListings)
{
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} new lisitng created with the following ids:`);
    console.log(result.insertedIds);
}