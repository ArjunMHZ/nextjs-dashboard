const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];


const products = [
  {
    id: '16ada62e-59d1-49d1-8170-52c1cdfe4338',
    name: '3 Petal Flower Diamond Ring',
    price: 25080,
    image_url: '/products/rings/CLCat2499.jpg',
    description: 'Gold Weight 1.3 Grams. Diamond Weight 0.05 Carat (Approx).Gold: 14Kt Pure Gold',
    category_id: 'be2c78c7-08f8-4e93-b384-2424170489b9'
  },
  {
    id: '72ba8f59-b6a5-4e3e-b1f3-6455b871e7b6',
    name: '3 Stack Design Diamond Ring',
    price: 36300.00,
    image_url: '/products/rings/MDiaRing4142.jpg',
    description: 'Gold Weight 1.9 Grams. Diamond Weight 0.07 Carat (Approx). Gold: 14Kt Pure Gold',
    category_id: 'be2c78c7-08f8-4e93-b384-2424170489b9'
  },
  {
    id: '77b46397-0372-44b4-9414-fa7c993318a3',
    name: '2 Oval Stack Diamond Ring',
    price: 40260,
    image_url: '/products/rings/MDiaRing4146.jpg',
    description: 'Gold Weight 2 Grams. Diamond Weight 0.09 Carat (Approx). Gold: 14Kt Pure Gold',
    category_id: 'be2c78c7-08f8-4e93-b384-2424170489b9'
  },
  {
    id: '46f795d8-9b02-48e8-9467-d148d3fcf577',
    name: 'Blue Graffiti Stainless Steel Ring',
    price: 2000,
    image_url: '/products/rings/Edelstahlring-Blue-Graffiti.jpg',
    description: 'Urban style, material: stainless steel with coating. stainless steel ring with graffiti look frienship ring, partner ring.',
    category_id: 'be2c78c7-08f8-4e93-b384-2424170489b9'
  },
  {
    id: '50a969dc-6972-4007-a0d6-8115f864d6ae',
    name: 'Golden Edge Tungsten Ring',
    price: 3500,
    image_url: '/products/rings/Ring-Golden-Edge-Tungsten.jpg',
    description: 'Tungsten ring, very heavy, can not be scratched. This ring is perfect as a partner ring in a set.',
    category_id: 'be2c78c7-08f8-4e93-b384-2424170489b9'
  },
  {
    id: '332167e3-ecdd-411f-bf60-9db5c6786e70',
    name: 'Pendant "Birds" stainless steel',
    price: 2000,
    image_url: '/products/etNox-Anhaenger-Voegel-Edelstahl.jpg',
    description: 'Urban style, Material: stainless steel.  Size: 0 approx. 3.2 cm',
    category_id: '29f08011-2984-4a8d-9cc8-341e6fbee6c3'
  },
  {
    id: '26c88d21-c9eb-4eec-a4a6-e0eeb89df959',
    name: 'Pendant "Anchor" stainless steel',
    price: 2100,
    image_url: '/products/etNox-Anhaenger-Anker-Edelstahl.jpg',
    description: 'etNox urban style, Material: stainless steel with zirconia. Size: approx. 3.2 x 2.5 cm',
    category_id: '29f08011-2984-4a8d-9cc8-341e6fbee6c3'
  },
  {
    id: 'fa53cc3b-a47b-4c63-9ffe-4b04a3e460f4',
    name: 'Auspicious Ganesh Diamond Pendant',
    price: 19800,
    image_url: '/products/CLCat2205.jpg',
    description: 'Gold Weight 1 Grams. Diamond Weight 0.04 Carat (Approx). Gold: 14Kt Pure Gold, Elegant Daily Wear..Budget Friendly',
    category_id: '29f08011-2984-4a8d-9cc8-341e6fbee6c3'
  },
  {
    id: '3d4ca7e7-f4a8-4fc0-84c1-2ccdd471928a',
    name: 'Beautiful Heart and Circle Diamond Pendant',
    price: 41000,
    image_url: '/products/CLCat2103.jpg',
    description: 'Gold Weight 1.6 Grams. Diamond Weight 0.14 Carat (Approx). Gold: 14Kt Pure Gold, Budget Friendly',
    category_id: '29f08011-2984-4a8d-9cc8-341e6fbee6c3'
  },
  {
    id: 'a81331fe-9065-4704-8c9f-d0510b12859b',
    name: 'Golden Bead Bangle',
    price: 212787,
    image_url: '/products/golden-bead-necklace-set.jpg',
    description: 'Six beaded Golden necklace set symbolized the six promises made with your loved one. Always bind together forever.',
    category_id: '3487d0f3-301e-483d-8615-12a3f23453ac'
  },
  {
    id: 'd5fda7ae-6a50-4abb-b2ca-04eb6c40657a',
    name: 'Eptomic Bangle',
    price: 209529,
    image_url: '/products/eptomic-necklaceset.jpg',
    description: 'This beautiful golden necklace set is perfect for any occasion! The contemporary style makes it perfect for dressing up or down, and the love tone of voice gives it a special touch.',
    category_id: '3487d0f3-301e-483d-8615-12a3f23453ac'
  },
  {
    id: '87b6b6bc-0892-491f-9166-8e6543564fb4',
    name: 'Glamour Gala Diamond Necklace Set',
    price: 2382000,
    image_url: '/products/glamour-gala-diamond-necklace-set-600x600.jpg',
    description: 'Necklace Details: Gold Weight: 46.81 gm, Diamond Weight: 12.81 ct, Gold Purity: 14 kt, Gross Weight: 54.57 gm, Color Stone Weight: 26.62 gm. Earring Details: Gold Weight: 16.514 gm, Diamond Weight: 3.58 ct, Gold Purity: 14 kt, Gross Weight: 19.08 gm, Color Stone Weight: 9.25 gm',
    category_id: '0a9b47e4-2c92-44be-8116-54c952fd0ed5'
  },
  {
    id: 'adcafe04-23a1-4575-8615-d373e8318cdf',
    name: 'Enchanting Gold Necklace Set',
    price: 594730,
    image_url: '/products/enchanting-gold-necklace-set-600x600.jpg',
    description: 'Necklace Details: Gold Weight: 39.02 gm, Gold Purity: 24kt, Gross Weight:39.02 gm. Earring Details: Gold Weight: 10.80 gm, Gold Purity: 24kt, Gross Weight: 10.80 gm',
    category_id: '0a9b47e4-2c92-44be-8116-54c952fd0ed5'
  },
  {
    id: 'de206c68-40c6-4299-aead-c6220f8c9089',
    name: 'Mary Block Diamond Bracelet',
    price: 273600,
    image_url: '/products/Dbrpzr-167_1-600x941.jpg',
    description: 'Gross wt.: 9.86 gram, Gold wt.: 4.80 gram 18kt.: 4.8 1gram, Diamond: 1.16 cent BG: 0.10',
    category_id: 'ff95e4cf-f254-4591-b6dd-d70f2c7a4126'
  },
  {
    id: '93b06356-495a-46c2-87a4-b6cb58fa8a7b',
    name: 'Stainless steel bracelet "curb chain" 15 mm x 20 cm',
    price: 22000,
    image_url: '/products/etNox-Edelstahlarmband-Panzerkette.jpg',
    description: 'Material: stainless steel, Width: 15 mm Length: approx. 20 cm',
    category_id: 'ff95e4cf-f254-4591-b6dd-d70f2c7a4126'
  },
 
]












const categories = [
  {
    id: 'be2c78c7-08f8-4e93-b384-2424170489b9',
    name: 'Rings',
    description: 'Explore our stunning collection of rings, from elegant engagement rings to fashionable statement pieces. Crafted with the finest materials, each ring is designed to add a touch of sparkle to any occasion.'
  },
  {
    id: '134bfccf-d58e-4ba5-9562-f8c327858c6d',
    name: 'Earrings',
    description: 'Elevate your look with our beautiful earrings, ranging from timeless studs to eye-catching hoops. Perfect for everyday wear or special occasions, each pair is designed to make a statement.'
  },
  {
    id: 'ff95e4cf-f254-4591-b6dd-d70f2c7a4126',
    name: 'Bracelets',
    description: 'Adorn your wrists with our exquisite collection of bracelets, featuring everything from delicate bangles to bold cuff designs. Crafted to suit any style, these bracelets are perfect for stacking or wearing solo.'
  },
  {
    id: '0a9b47e4-2c92-44be-8116-54c952fd0ed5',
    name: 'Necklaces',
    description: 'Discover our enchanting necklaces, from simple and elegant chains to ornate statement pieces. Whether you are looking for a delicate pendant or a bold collar, each necklace is designed to enhance your neckline beautifully.'
  },
  {
    id: '3487d0f3-301e-483d-8615-12a3f23453ac',
    name: 'Bangles',
    description: 'Browse our versatile bangle collection, offering everything from sleek, minimal designs to intricate, embellished pieces. These timeless accessories are perfect for stacking or making a bold statement on their own.'
  },
  {
    id: '29f08011-2984-4a8d-9cc8-341e6fbee6c3',
    name: 'Pendants',
    description: 'Explore our stunning range of pendants, from simple and classic designs to more intricate and detailed pieces. Perfect for personalizing your necklace, each pendant carries its own unique story and charm.'
  },
]









const orders = [
  {
    id: 'a084a045-008d-4b28-88b6-caa671f6c9d7',
    user_id: '',
    total_amount: '75000',
    status: 'pending',
    
  }
]


const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { customers, invoices, revenue, products, categories };
