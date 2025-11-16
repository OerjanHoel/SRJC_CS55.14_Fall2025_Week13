
// Import got package so you can get data from the URL
import got from 'got';


const dataURL = "https://dev-cs5513-database.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

export async function getAllPostIds() {
    // const filePath = path.join(dataDir, 'posts.json'); // Variable for the JSON file location
    // const jsonString = fs.readFileSync(filePath, 'utf8'); // Variable for reading the JSON file
    
    let jsonString;
    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
    } catch(error) {
        // on error, fall back to an empty array JSON string so JSON.parse won't throw
        console.error('Failed to fetch posts JSON:', error.message || error);
        jsonString = { body: '[]' };
    }

    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString.body);
    } catch (err) {
        console.error('Failed to parse posts JSON:', err.message || err);
        jsonObj = [];
    }
    // Writes  out the objects in the JSON array to temrinal
    console.log(jsonObj);
    // Give us the output from the mapping of the array
    return jsonObj.map(item => {
        return {
            params: {
                id: item.ID.toString()
            }
        }
    });
}

export async function getSortedPostsData() {
    
    let jsonString;
    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
    } catch(error) {
        console.error('Failed to fetch posts JSON:', error.message || error);
        jsonString = { body: '[]' };
    }

    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString.body);
    } catch (err) {
        console.error('Failed to parse posts JSON:', err.message || err);
        jsonObj = [];
    }

    jsonObj.sort(function (a, b) {
        return a.post_title.localeCompare(b.post_title);
    });

    // Give us the output from the mapping of the array
    return jsonObj.map(item => {
        return {
            id: item.ID.toString(),
            title: item.post_title,
            content: item.post_content
        }
    });
}

export async function getPostData(id) {
    // const filePath = path.join(dataDir, 'posts.json'); // Variable for the JSON file location
    // const jsonString = fs.readFileSync(filePath, 'utf8'); // Variable for reading the JSON file
    
    let jsonString;
    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
    } catch(error) {
        console.error('Failed to fetch posts JSON:', error.message || error);
        jsonString = { body: '[]' };
    }

    let jsonObj;
    try {
        jsonObj = JSON.parse(jsonString.body);
    } catch (err) {
        console.error('Failed to parse posts JSON:', err.message || err);
        jsonObj = [];
    }
    
    // Give us the output from the mapping of the array
    const objReturned = jsonObj.filter(obj => {
    return obj.ID.toString() === id;
    
    });
    console.log(objReturned);

    // If statement gives a mesasge if the objects are not returned from JSON 
    if (objReturned.length === 0) {
        return {
            id: id,
            title: 'Not found',
            //date: '' || null,
            //contentHtml: 'Not found',
            //sourceURL: ''
        }
    } else {
        return objReturned[0];
    }
}