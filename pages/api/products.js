export default async function handler(req, res) {
    if(req.query.type){
        const query_api = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${req.query.type}`)
        const data = await query_api.json()

        const new_object = new Array()

        data.map((item) => {
            new_object.push (  {id:item.id, name:item.name} );
        })

        res.status(200).json(new_object)
    } 
    
    else {
        const query_api = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json`)
        const data = await query_api.json()

        const new_object = new Array()

        data.map((item) => {
            new_object.push (  {id:item.id, name:item.name} );
        })

        res.status(200).json(new_object)
    }
}
  