## Запросы в бэк, с главной страницы
/pages/index.vue

### Отправка тестового запроса:
К примеру hoswbhistory.s2.marketsapi.ru - берется адрес указанный в value из main в маркете (из примера /public/data/server.json) 
и подставляется param из additional

в результате в бэк идет запрос вида:
https://hoswbhistory.s2.marketsapi.ru?sku=44524555225

```
"params": {
			"main": [
				{ "id": 1, "name": "Автоматический подключен тестовый", "value": "hoswbhistory.s2.marketsapi.ru"},
				{ "id": 2, "name": "подключен тестовый 2", "value": "hoswbhistory.s3.marketsapi.ru"}
			],
			"additional": {
				"param": "string"
			}
		},
```

ожидается ответ в зависимости от результата (200 или 400): 
```
"response": [
			{
				"status": 200,
				"name": "200",
				"value": "<div class=\"table-code\"><ul><li class=\"open\"><div>item  {} 18 keys:</div><ul><li class=\"open\"><div>item  {} 18 keys:</div><ul><li><div>num_iid: \"730337851259\"</div></li><li><div>title: <span class=\"green\">\"Резиновые сапоги белые для женщин\"</span></div></li><li><div>desc_short: \"\"</div></li><li><div>price: <span class=\"blue\">\"79.00\"</span></div></li><li><div>total_price: 0</div></li><li><div>suggestive_price: 0</div></li><li><div>orginal_price: <span class=\"blue\">\"79.00\"</span></div></li><li><div>nick: <span class=\"green\">\"珂茹旗舰店\"</span></div></li><li><div>num: null</div></li></ul></li><li><div>item  {} 18 keys:</div><ul><li><div>num_iid: \"730337851259\"</div></li><li><div>title: <span class=\"green\">\"Резиновые сапоги белые для женщин\"</span></div></li><li><div>desc_short: \"\"</div></li><li><div>price: <span class=\"blue\">\"79.00\"</span></div></li><li><div>total_price: 0</div></li><li><div>suggestive_price: 0</div></li><li><div>orginal_price: <span class=\"blue\">\"79.00\"</span></div></li><li><div>nick: <span class=\"green\">\"珂茹旗舰店\"</span></div></li><li><div>num: null</div></li></ul></li></ul></li><li><div>item  {} 18 keys:</div><ul><li><div>item  {} 18 keys:</div><ul><li><div>num_iid: \"730337851259\"</div></li><li><div>title: <span class=\"green\">\"Резиновые сапоги белые для женщин\"</span></div></li><li><div>desc_short: \"\"</div></li><li><div>price: <span class=\"blue\">\"79.00\"</span></div></li><li><div>total_price: 0</div></li><li><div>suggestive_price: 0</div></li><li><div>orginal_price: <span class=\"blue\">\"79.00\"</span></div></li><li><div>nick: <span class=\"green\">\"珂茹旗舰店\"</span></div></li><li><div>num: null</div></li></ul></li></ul></li></ul></div>"
			},
			{
				"status": 400,
				"name": "400",
				"value": "HTTP 400 Bad Request Error"
			}
		]
```