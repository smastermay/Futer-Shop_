let products = [];
const cart = {};

const updateCart = () => {
    let totalPrice = 0;
    document.querySelector('#cartSummary_items').replaceChildren([]);

    for (const key of Object.keys(cart)) {
        const item = products.find((product) => {
            return `${product.id}` === key;
        });

        const quantity = cart[key];
        const price = item.price;

        const itemRow = document.createElement('tr');

        const itemName = document.createElement('th');
        itemName.innerText = item.title;

        const itemQuantity = document.createElement('td');
        itemQuantity.innerText = quantity;

        const itemPrice = document.createElement('td');
        itemPrice.innerText = quantity * price;

        itemRow.append(itemName, itemQuantity, itemPrice);
        document.querySelector('#cartSummary_items').append(itemRow);

        totalPrice = totalPrice + price * quantity;
    }

    document.querySelector('#cartSummary_total').innerText = totalPrice;
}

const createCard = (product) => {
    const productCard = document.createElement('div');
    productCard.className = 'productCard';

    const productThumbnail = document.createElement('img');
    productThumbnail.className = 'productThumbnail';
    /*productThumbnail.src = 'https://images.unsplash.com/photo-1695048132853-026f93f40f7f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'*/
    productThumbnail.src = product.thumbnail;

    const productBottomSheet = document.createElement('div');
    productBottomSheet.className = 'productBottomSheet';

    const productInfoContainer = document.createElement('div');
    productInfoContainer.className = 'productInfoContainer';

    const productName = document.createElement('strong');
    productName.className = 'productName';
    /*productName.innerText = 'iPhone';*/
    productName.innerText = product.title;
    
    const productPrice = document.createElement('div');
    productPrice.className = 'productPrice';
    /*productPrice.innerText = '$200';*/
    productPrice.innerText = '$'+ product.price;

    const addToCart = document.createElement('button');
    addToCart.className = 'addToCart';
    addToCart.innerText = `+`;
    addToCart.addEventListener('click',() => {
        if(cart[product.id] === undefined) cart[product.id] = 0;

        cart[product.id] = cart[product.id] + 1;

        updateCart();
    })

    const dltToCart = document.createElement('button');
    dltToCart.className = 'dltToCart';
    dltToCart.innerText = `-`;
    dltToCart.addEventListener('click',() => {
        if(cart[product.id] === undefined) cart[product.id] = 0;
        cart[product.id] = cart[product.id] - 1;

        if(cart[product.id] === 0) {
            dltToCart.disabled = true;
        }

        updateCart();
    })

    productInfoContainer.append(productName,productPrice);
    productBottomSheet.append(productInfoContainer,addToCart);
    productCard.append(productThumbnail,productBottomSheet);
    productBottomSheet.append(productInfoContainer,dltToCart);

    document.querySelector('#productList').appendChild(productCard);
    
};

const hookviewcart = () => {
    const viewcartButton = document.querySelector('#viewcart');
    viewcartButton.addEventListener('click',() => {
        const cartSummary = document.querySelector('#cartSummary');
        const display = cartSummary.style.display;

        if(display === 'none'){
            cartSummary.style.display = 'block';
        } else {
            cartSummary.style.display = 'none';
        }
    });
};

function fetchProduct() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((productResponse) => {
            products = productResponse.products;

            products.forEach(product => {
                createCard(product);
            });

            console.log(products);
        });
}

fetchProduct();
hookviewcart();

