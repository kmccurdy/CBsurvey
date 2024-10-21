const clusterCenters = [
    { name: "Minimal Interventionist", color: "#E41A1C", center: [0.125, 0.25, -1.125, 0.875, -4.625, -4.625, -4.5, -4.375, -1.25, 4, -1.875, -3.875] },
    { name: "Grounded Symbolic Interpretability", color: "#377EB8", center: [1.43333333333333, -1.3, -2.76666666666667, -0.966666666666667, 3.9, 3.7, 2.43333333333333, -4.76666666666667, -4.7, -0.1, 4.5, 4.16666666666667] },
    { name: "Default View", color: "#4DAF4A", center: [3.98387096774194, 0.854838709677419, -4.30645161290323, -3.59677419354839, -4.17741935483871, -3.69354838709677, -3.46774193548387, -4.59677419354839, -2.98387096774194, -1.79032258064516, 2.79032258064516, -1.6] },
    { name: "Minimal Interpretability", color: "#984EA3", center: [3.5, -4.125, -3.5, -3.375, 2, 4.375, -3.625, -3.875, -3.25, -2.125, 1.5, -3.25] },
    { name: "Current Analysis Suffices", color: "#FF7F00", center: [2.125, 4.375, 1.75, 3.875, -4.75, -3.625, -5.25, -4.5, -2.875, -3, 4, 0.875] },
    { name: "Non-interventionist", color: "#F781BF", center: [3.5, 0.388888888888889, -4.72222222222222, -2.5, -3.83333333333333, -4.38888888888889, -0.944444444444444, 1.83333333333333, -0.277777777777778, 1.875, -1.75, -4.75] },
];

const basisVectors = {
    x: [-0.0734804417033983, -0.275843550187316, -0.0517187153333945, -0.100692275487665, 0.517348836008753, 0.50766221699323, 0.341491985430528, -0.0963161382923665, -0.179946574728634, -0.120373937344164, 0.258838846041609, 0.374919562825312],
    y: [-0.0340883590555197, 0.503140717042475, 0.35397850297216, 0.474791426171133, -0.0607191591697719, -0.033352119524332, -0.134930313647712, -0.138021780468771, -0.130452472376395, -0.256343342237161, 0.393401270114344, 0.339720511775424]
};

function calculateCluster() {
    const form = document.getElementById('surveyForm');
    const formData = new FormData(form);
    const responses = [];

    for (let [key, value] of formData.entries()) {
        responses.push(parseFloat(value));
    }

    let bestFitCluster = null;
    let smallestDistance = Infinity;

    clusterCenters.forEach(cluster => {
        const distance = calculateDistance(responses, cluster.center);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            bestFitCluster = cluster;
        }
    });

    //document.getElementById('result').innerText = `Best fit cluster: ${bestFitCluster}`;
    const projection = calculateProjection(responses, basisVectors);
    displayResult(bestFitCluster, projection);
}

function calculateDistance(arr1, arr2) {
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
        sum += Math.pow(arr1[i] - arr2[i], 2);
    }
    return Math.sqrt(sum);
}

function calculateProjection(responses, basis) {
    const x = dotProduct(responses, basis.x);
    const y = dotProduct(responses, basis.y);
    return { x, y };
}

function dotProduct(arr1, arr2) {
    return arr1.reduce((sum, value, index) => sum + value * arr2[index], 0);
}

function displayResult(cluster, projection) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Best fit cluster: ${cluster.name}</p>
        <p>Projection: (${projection.x.toFixed(2)}, ${projection.y.toFixed(2)})</p>
    `;

    const youBox = document.getElementById('youBox');
    youBox.style.borderColor = cluster.color;
    youBox.style.color = cluster.color;

    // Assuming the plot image is 1000x1000 pixels for this example
    const plotWidth = 1000;
    const plotHeight = 1000;

    // Map the projection coordinates to the plot dimensions
    const xPos = (projection.x + 1) / 2 * plotWidth; // Adjust based on your coordinate system
    const yPos = (1 - (projection.y + 1) / 2) * plotHeight; // Adjust based on your coordinate system

    youBox.style.left = `${xPos}px`;
    youBox.style.top = `${yPos}px`;
}
