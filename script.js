const clusterCenters = [
    { name: "Minimal Interventionist", center: [0.125, 0.25, -1.125, 0.875, -4.625, -4.625, -4.5, -4.375, -1.25, 4, -1.875, -3.875] },
    { name: "Grounded Symbolic Interpretability", center: [1.43333333333333, -1.3, -2.76666666666667, -0.966666666666667, 3.9, 3.7, 2.43333333333333, -4.76666666666667, -4.7, -0.1, 4.5, 4.16666666666667] },
    { name: "Default View", center: [3.98387096774194, 0.854838709677419, -4.30645161290323, -3.59677419354839, -4.17741935483871, -3.69354838709677, -3.46774193548387, -4.59677419354839, -2.98387096774194, -1.79032258064516, 2.79032258064516, -1.6] },
    { name: "Minimal Interpretability", center: [3.5, -4.125, -3.5, -3.375, 2, 4.375, -3.625, -3.875, -3.25, -2.125, 1.5, -3.25] },
    { name: "Current Analysis Suffices", center: [2.125, 4.375, 1.75, 3.875, -4.75, -3.625, -5.25, -4.5, -2.875, -3, 4, 0.875] },
    { name: "Non-interventionist", center: [3.5, 0.388888888888889, -4.72222222222222, -2.5, -3.83333333333333, -4.38888888888889, -0.944444444444444, 1.83333333333333, -0.277777777777778, 1.875, -1.75, -4.75] },
];

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
            bestFitCluster = cluster.name;
        }
    });

    document.getElementById('result').innerText = `Best fit cluster: ${bestFitCluster}`;
}

function calculateDistance(arr1, arr2) {
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
        sum += Math.pow(arr1[i] - arr2[i], 2);
    }
    return Math.sqrt(sum);
}
