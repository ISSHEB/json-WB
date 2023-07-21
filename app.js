const express   = require('express');
const axios     = require('axios');
const app       = express();

app.use(express.json()) 

app.post('/', async (req, res) => {
    
    try {
        const response = await axios.get(`https://card.wb.ru/cards/detail?appType=1&curr=rub&dest=-2133464&regions=80,38,83,4,64,33,68,70,30,40,86,69,22,1,31,66,110,48,114&spp=0&nm=${req.body['key']}`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "Referer": `https://www.wildberries.ru/catalog/${req.body['key']}/detail.aspx`,
                "Referrer-Policy": "no-referrer-when-downgrade"
            },
            "body": null,
            "method": "GET",
        });

        var inventoryData       = response.data.data.products[0]['sizes'];
        var ActionData          = [];

        for(var _size of inventoryData)
        {
            ActionData.push({
                'Art': req.body['key'],
                'Name': _size['name'],
                'Quantity': _size['time1'] ? _size['time1'] : 0,
            });
        };
        
        res.json(ActionData);

    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении остатков на складе' });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});