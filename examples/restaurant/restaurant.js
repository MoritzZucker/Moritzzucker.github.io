const menuItems = [
    { category: 'pizza', name: 'Margherita', price: '8.99', description: 'Klassische Pizza mit Tomaten und Mozzarella.', image: './pics/margherita.jpg' },
    { category: 'pizza', name: 'Salami', price: '9.99', description: 'Pizza mit würziger Salami, Tomaten und Käse.', image: './pics/salami.jpg' },
    { category: 'pizza', name: 'Vegetarisch', price: '10.99', description: 'Pizza mit frischem Gemüse, Tomaten und Mozzarella.', image: './pics/vegetarian.jpg' },

    // Burger
    { category: 'burger', name: 'Cheeseburger', price: '9.99', description: 'Saftiger Burger mit Käse, Salat und Tomaten.', image: './pics/cheeseburger.jpg' },
    { category: 'burger', name: 'BBQ Bacon Burger', price: '11.99', description: 'Burger mit BBQ-Sauce, knusprigem Bacon, Käse und Zwiebeln.', image: './pics/bbq-bacon-burger.jpg' },
    { category: 'burger', name: 'Vegetarischer Burger', price: '10.99', description: 'Vegetarischer Burger mit gegrilltem Gemüse und Avocado.', image: './pics/vegetarian-burger.jpg' },

    // Salate
    { category: 'salad', name: 'Caesar Salad', price: '7.99', description: 'Fruchtiger Salat mit Hähnchen, Croutons und Caesar-Dressing.', image: './pics/caesar-salad.jpg' },
    { category: 'salad', name: 'Griechischer Salat', price: '8.99', description: 'Frischer Salat mit Tomaten, Gurken, Oliven und Feta.', image: './pics/greek-salad.jpg' },
    { category: 'salad', name: 'Caprese Salat', price: '6.99', description: 'Tomaten-Mozzarella-Salat mit Basilikum und Balsamico.', image: './pics/caprese-salad.jpg' },

    // Nudeln
    { category: 'pasta', name: 'Spaghetti Bolognese', price: '10.99', description: 'Klassische Spaghetti mit hausgemachter Bolognesesauce.', image: './pics/spaghetti-bolognese.jpg' },
    { category: 'pasta', name: 'Penne Alfredo', price: '9.99', description: 'Penne-Nudeln in cremiger Alfredo-Sauce mit Parmesan.', image: './pics/penne-alfredo.jpg' },
    { category: 'pasta', name: 'Vegetarische Lasagne', price: '12.99', description: 'Lasagne mit frischem Gemüse und Tomatensauce.', image: './pics/vegetarian-lasagna.jpg' },

    // Deutsch
    { category: 'german', name: 'Schnitzel mit Pommes', price: '13.99', description: 'Knuspriges Schnitzel mit Pommes Frites und Zitrone.', image: './pics/schnitzel.jpg' },
    { category: 'german', name: 'Bratwurst mit Sauerkraut', price: '11.99', description: 'Deutsche Bratwurst mit Sauerkraut und Senf.', image: './pics/bratwurst.jpg' },
    { category: 'german', name: 'Kartoffelsuppe', price: '7.99', description: 'Herzhafte Kartoffelsuppe mit Würstchen und Gemüse.', image: './pics/potato-soup.jpg' },

    // Asiatisch
    { category: 'asian', name: 'Hühnchen Teriyaki', price: '12.99', description: 'Gebratenes Hühnchen mit süßer Teriyaki-Sauce und Gemüse.', image: './pics/teriyaki-chicken.jpg' },
    { category: 'asian', name: 'Gemüse-Frühlingsrollen', price: '8.99', description: 'Knusprige Frühlingsrollen mit Gemüse und Dip.', image: './pics/spring-rolls.jpg' },
    { category: 'asian', name: 'Sushi-Variation', price: '15.99', description: 'Verschiedene Sushi-Rollen mit Sojasauce und Ingwer.', image: './pics/sushi.jpg' },

    // Dessert
    { category: 'dessert', name: 'Schokoladen-Mousse', price: '6.99', description: 'Luftiges Schokoladen-Mousse mit Beeren-Topping.', image: './pics/chocolate-mousse.jpg' },
    { category: 'dessert', name: 'Tiramisu', price: '7.99', description: 'Klassisches Tiramisu mit Kaffee und Mascarpone-Creme.', image: './pics/tiramisu.jpg' },
    { category: 'dessert', name: 'Erdbeer-Cheesecake', price: '8.99', description: 'Fruchtiger Erdbeer-Cheesecake mit knusprigem Boden.', image: './pics/strawberry-cheesecake.jpg' },

    // Getränke
    { category: 'drinks', name: 'Hausgemachte Limonade', price: '3.99', description: 'Erfrischende Limonade mit frischen Früchten.', image: './pics/lemonade.jpg' },
    { category: 'drinks', name: 'Cappuccino', price: '4.99', description: 'Aromatischer Cappuccino mit einem Hauch von Schokolade.', image: './pics/cappuccino.jpg' },
    { category: 'drinks', name: 'Frischer Orangensaft', price: '3.49', description: 'Natürlich gepresster Orangensaft, frisch und vitaminreich.', image: './pics/orange-juice.jpg' },
];

document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
});

function displayMenuItems(items) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" height="250px" width=auto>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Preis: $${item.price}</p>
        `;
        menuContainer.appendChild(menuItem);
    });
}

function filterMenu(category) {
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    displayMenuItems(filteredItems);
}

