export default async function handler(req, res) {
  const { q, placeId } = req.query;
  const key = 'AIzaSyBdLY6yPpNZFD7AB2dPECsznDNTFpiRuwU';
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    let url;
    if (placeId) {
      url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&fields=name,formatted_address,formatted_phone_number,website,address_components&key=' + key;
    } else if (q) {
      url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(q) + '&types=establishment&key=' + key;
    } else {
      return res.status(400).json({ error: 'Missing q or placeId' });
    }
    
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
