
const form = document.getElementById('asset-form');
const assetList = document.getElementById('asset-list');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const acquisitionDate = document.getElementById('acquisitionDate').value;
    const cost = document.getElementById('cost').value;
    const lifeExpectancy = document.getElementById('lifeExpectancy').value;

    const response = await fetch('http://localhost:3000/api/assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, acquisitionDate, cost, lifeExpectancy })
    });

    if (response.ok) {
        const asset = await response.json();
        addAssetToList(asset);
    }
});

async function loadAssets() {
    const response = await fetch('http://localhost:3000/api/assets');
    const assets = await response.json();
    assets.forEach(addAssetToList);
}

function addAssetToList(asset) {
    const li = document.createElement('li');
    li.textContent = `${asset.name} - ${asset.acquisitionDate} - R$ ${asset.cost} - ${asset.lifeExpectancy} anos`;
    assetList.appendChild(li);
}

loadAssets();
