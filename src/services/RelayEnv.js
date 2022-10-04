import { Environment, Network, Record, RecordSource, Store } from "relay-runtime"

function fetchQuery(operation, variables) {
    return fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer'
        },
        body: JSON.stringify({
            query: operation.text,
            variables
        })
    }).then((response) => {
        return response.json()
    })
}

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source)

const env = new Environment({
    network,
    store
})

export default env