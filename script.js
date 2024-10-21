const clusterCenters = [
    { name: "Cluster 1", center: [/* values */] },
    { name: "Cluster 2", center: [/* values */] },
    // Add more clusters as needed
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
