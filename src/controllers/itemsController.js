import fs from 'fs';
import path from 'path'
import dotenv from 'dotenv';
dotenv.config();
const PATH_2_JSON = process.env.JSON_DIRECTORY||"DATA/JSON"
const JSON_ITEMS = path.resolve(PATH_2_JSON, 'items.json');

const products = JSON.parse(fs.readFileSync(JSON_ITEMS, 'utf-8'));


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.json({data: products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		let idURL = req.params.id;
		let productoEncontrado;

		for (let p of products){
			if (p.id==idURL){
				productoEncontrado=p;
				break;
			}
		}

		res.json({productoDetalle: productoEncontrado});

	},

	// Create - Form to create
	create: (req, res) => {
		res.json({
            message: "Create a new product",
            product: {
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                category: req.body.category,
                description: req.body.description,
                image: req.file.filename
            }
        });
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let errors = validationResult(req);

		if ( errors.isEmpty() ) {

			idNuevo=0;

		for (let s of products){
			if (idNuevo<s.id){
				idNuevo=s.id;
			}
		}

		idNuevo++;

		let nombreImagen = req.file.filename;


		let productoNuevo =  {
			id:   idNuevo,
			name: req.body.name ,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: nombreImagen
		};

		products.push(productoNuevo);

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/');

		
		}
		else{
			res.render('product-create-form', {errors: errors.array() } ); 
		}
	
		
	},

	// Update - Form to edit
	edit: (req, res) => {

		let id = req.params.id;
		let productoEncontrado;

		for (let s of products){
			if (id==s.id){
				productoEncontrado=s;
			}
		}

		res.render('product-edit-form',{ProductoaEditar: productoEncontrado});
	},

	// Update - Method to update
	update: (req, res) => {
		
		let id = req.params.id;
		let productoEncontrado;

		for (let s of products){
			if (id==s.id){
				s.name= req.body.name;
				s.price= req.body.price;
				s.discount= req.body.discount;
				s.category= req.body.category;
				s.description= req.body.description;
				break;
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let id = req.params.id;
		let ProductoEncontrado;

		let Nproducts = products.filter(function(e){
			return id!=e.id;
		})

		for (let producto of products){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, '../../public/images/products/', ProductoEncontrado.image));

		fs.writeFileSync(productsFilePath, JSON.stringify(Nproducts,null,' '));

		res.redirect('/');
	}
};

export default controller;