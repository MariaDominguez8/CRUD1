const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = require("../javascript/toThousand");
const finalPrice = require("../javascript/finalPrice");
const checkId = require("../javascript/checkId");


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products",{
			products,
			finalPrice,
			toThousand
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const id = parseInt(req.params.id, 10);
		if(checkId(id,products)){
			let producto = products.find(product => product.id === +req.params.id);
			res.render("detail",{
				producto,
				toThousand,
				finalPrice
			});
		}else{
			res.redirect("/");
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name,description,price,discount,category} = req.body;
		let producto = {
			id: products[products.length - 1].id + 1,
			name,
			description,
			price: +price,
			discount: +discount,
			image: "default-image.png",
			category
		}
		products.push(producto); 
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		return res.redirect("/");
	},

	// Update - Form to edit
	edit: (req, res) => {
		producto = products.find(producto => producto.id === +req.params.id); 
		res.render("product-edit-form",{
			producto 
		});
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount,category,description} = req.body; 
		products.forEach(producto => {
			if (producto.id === +req.params.id){
				producto.id === +req.params.id;
				producto.name = name;
				producto.price = +price;
				producto.discount = +discount;
				producto.category = category;
				producto.description = description;
			}
		});
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		res.redirect("/products/detail/"+req.params.id);
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
                     
		products = products.filter((producto) => producto.id !== +req.params.id)
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),"utf-8")
		res.redirect("/")    
		
	}
};

module.exports = controller;