const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = require("../javascript/toThousand");
const finalPrice = require("../javascript/finalPrice")


const controller = {
	index: (req, res) => {
		return res.render("index",{
			visitadas: products.filter(product => product.category === "visited"),
			ofertas: products.filter(product => product.category === "in-sale"),
			toThousand,
			finalPrice

			})
	},
	search: (req, res) => {
		if(req.query.keywords.trim() != ""){
			let resultados = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()));
			return res.render("results",{
				resultados,
				toThousand,
				finalPrice,
				busqueda: req.query.keywords.trim(),
			})
		}else{
			res.redirect("/");
		}
		
	},
}


module.exports = controller;