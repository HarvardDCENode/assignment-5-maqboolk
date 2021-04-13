// wrap in IIFE to control scope
(function () {

    const baseURL = 'http://localhost:8080';

    function testAPIs() {
        const line = '-- -- -- -- -- -- -- -- -- -- ---';
        let testJSON = {
            "name": "TEST API Chicken",
            "price": 12.75,
            "ingredients": "TEST API Chickeen chicken chicken",
            "available": false
        };
        console.log('Testing all API\'s\n', line, line, line);
        console.log('Listing all menu items availabel in DB.');

        //  list all menu  items
        callAPI('GET', '/api/menu')
            .then((menuItems) => {
                console.log('Menu Items :', menuItems);
                return menuItems;
            })
            // Create an item
            .then(() => {
                return callAPI('POST', '/api/menu', testJSON)
                    .then((item) => {
                        console.log('Created Item :', item);
                        return item;
                    })

            })
            // Get newly created Item
            .then((item) => {
                return callAPI('GET', `/api/menu/${item._id}`)
                    .then((item) => {
                        console.log('Read new Item :', item);
                        return item;
                    })
            })
            // Updating an Item
            .then((item) => {
                item.name += ' UPDATED...';
                item.ingredients += ' UPDATED...';
                item.price = 19.99;
                item.available = true;
                return callAPI('PUT', `/api/menu/${item._id}`, item)
                    .then((updateItem) => {
                        console.log('Updated Item :', updateItem);
                        return updateItem;
                    })
            })
            // Deleting an Item
            .then((updateItem) => {
                return callAPI('DELETE', `/api/menu/${updateItem._id}`)
                    .then((deletedItem) => {
                        console.log('Deleted Item :', deletedItem);
                    })
            })
    }

    function callAPI(method, uri, body) {
        let url = baseURL + uri;
        let fetchOptions = {
            method: method,
            headers: {
                'Content-type': 'application/json'
            },
        };
        if (body) {
            fetchOptions.body = JSON.stringify(body);
        }
        return fetch(url, fetchOptions).then((response) => response.json());
    }

    document.querySelector('#testme').addEventListener("click", () => {
        testAPIs();
    });

})();