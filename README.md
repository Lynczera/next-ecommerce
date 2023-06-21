# Pseudo instructions for specifcs implementations 

## Google auth

First, we need app to return a session provider

```bash
<SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
```
then we have useSession to track the session

```bash
const { data: session } = useSession();
```
we can check session at the beginning from that useSession
the sign in button is 
```bash
 <button onClick={() => signIn('google')}>...</button>
```

## MongoDB
We first need to connect to mongoDB
```bash
mongoose.connect(uri);
```
Then we need to create a schema and a model 
```bash
const ProductSchema = new Schema({
    productName : {type: String, required: true},
    description : String,
    price : {type: Number, required: true},
});

export const Product = mongoose.models.Product ||  model('Product', ProductSchema);
```

## Adding images to AWS bucket 
First, create the bucket, ?(a policy), and a user 
### reading files 
fs to read file <br />
mime-types for identifying file types <br />

We need to create a client to send the image 
```bash
const client = new S3Client({
    region: "...",
    credentials: {
      accessKeyId: ...,
      secretAccessKey: ...,
    },
  });
```
For sending the image 
```bash
await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "...",
        ContentType: mime.lookup(file.path),
      })
    );
```

## multiparty for image upload 

we add all the images to a FormData and we're going to send this data in a specific format
```bash
const res = await axios.post('/api/upload', data, {
        headers:{'Content-Type':'multipart/form-data'}
      });
```  
we need specific config for the api handler 
```bash
export const config = {
  api: { bodyParser: false },
};
```

when we get the data, we need check, and grab the files
```bash
const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
```

the resolve/reject from promise is checking, and saving in files.



