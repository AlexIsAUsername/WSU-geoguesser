const getKey = (): Promise<string | undefined> => {
    return fetch("http://localhost:4000/getkey", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.status !== 200) {
                console.log("Something went wrong :(");
                return;
            }
            return res.json();
        })
        .then((data) => {
            return data.key;
        })
        .catch((error) => {
            console.error("Error fetching key:", error);
            return;
        });
};


export default getKey;
// react is kinda dumb and this is like the only way to do this unfornetly
// getKey().then((key) => {
//     console.log("Fetched key:", key);
// });
