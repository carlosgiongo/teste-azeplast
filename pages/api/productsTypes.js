export default async function handler(req, res) {
  const query = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json`)
  const data = await query.json()
  var counts = {};

  data.map((item) => {
    counts[item.product_type] = (
      counts[item.product_type] || 0
    )+1;
  });

  res.status(200).json(counts)
}
