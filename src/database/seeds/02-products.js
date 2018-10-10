const productRows = [
    {name: 'Rainbow Purse',  price: 73 , vendor_id: 2, image_link: "http://www.rainbowshop.eu/WebRoot/Store12/Shops/160082/5890/9299/49D9/20DD/D1DF/C0A8/2BB9/DD4E/1676Q_m.JPG"},
    {name: 'Neon See Through Fanny',  price: 27 , vendor_id: 3, image_link: "https://i.pinimg.com/originals/a8/32/e5/a832e547e3f78ba6d97dabe0844b2ea1.jpg"},
    {name: 'Pronounce Skincare',  price: 43 , vendor_id: 1, image_link: "https://i.pinimg.com/originals/1c/f0/a4/1cf0a44e5e0e0db51a103e8a331a10e5.jpg"},
    {name: 'Matcha Specialty Tea',  price: 13 , vendor_id: 1, image_link: "http://teatrendingnow.com/wp-content/uploads/2017/06/Promotion-Premium-China-Matcha-Green-Tea-Powder-Natural-Organic-Matcha-Tea-of-Slimming-China-Supplies.jpg"},
    {name: 'Joico Hair Product',  price: 23 , vendor_id: 2, image_link: "http://www.joico.com/wp-content/uploads/2012/10/kpak-family.jpg"},
    {name: 'Parseley Seed Eye Serum',  price: 31 , vendor_id: 3, image_link: ""},
    {name: 'Rubber Duck Socks',  price: 12 , vendor_id:  3, image_link: "https://cdn.shopify.com/s/files/1/1631/8771/products/Rubber_Ducks_Socks_-_Crew_Socks_for_Men_600x.jpg?v=1494455929"},
    {name: 'Parseley Seed Eye Serum',  price: 31 , vendor_id: 2, image_link: ""},
    {name: 'Kendall Stockton Baby Dress',  price: 65 , vendor_id: 3, image_link: ""},
    {name: 'Elyx Bronze Chalice Set',  price: 48 , vendor_id: 1, image_link: ""}

]
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert(productRows);
    });
};
