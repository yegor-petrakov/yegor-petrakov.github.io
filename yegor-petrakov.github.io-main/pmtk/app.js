const tableBody = document.getElementById('tbody');

// sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
const sheetId = "18hsJ9g2Zf1sY94-3R2y_jGdE2fTQ5sao-PDM_kA5q3k";
// sheetName is the name of the TAB in your spreadsheet
const sheetName = encodeURIComponent("Лист1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL)
    .then((response) => response.text())
    .then((csvText) => handleResponse(csvText));

function handleResponse(csvText) {
    let sheetObjects = csvToObjects(csvText);
    // sheetObjects is now an Array of Objects
    // console.log(sheetObjects);
    // ADD CODE HERE

    const data = [];

    sheetObjects.forEach(row => {
        data.push(Object.values(row));
    });

    // data.forEach(row => {
    //     tableBody.innerHTML += `
    //     <tr class="bg-slate-200 border border-b-slate-300 border-b-2 text-center">
    //     <td class="px-4 py-2">${row[0]}</td>
    //     <td class="px-4 py-2">${row[1]}</td>
    //     <td class="px-4 py-2 text-center">
    //         <input type="checkbox">
    //     </td>
    //     <td class="px-4 py-2 text-center">
    //         <input type="checkbox">
    //     </td>
    //     `;
    // });

    data.forEach(row => {
        tableBody.innerHTML += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${row[0]}
                </th>
                <td class="px-6 py-4">
                    ${row[1]}
                </td>
                <td class="px-6 py-4">
                    Достаточно
                </td>
                <td class="px-6 py-4">
                    Достаточно
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        `;
    });
}

function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    for (let i = 1, max = csvRows.length; i < max; i++) {
        let thisObject = {};
        let row = csvSplit(csvRows[i]);
        for (let j = 0, max = row.length; j < max; j++) {
            thisObject[propertyNames[j]] = row[j];
            // BELOW 4 LINES WILL CONVERT DATES IN THE "ENROLLED" COLUMN TO JS DATE OBJECTS
            if (propertyNames[j] === "Enrolled") {
                thisObject[propertyNames[j]] = new Date(row[j]);
            } else {
                thisObject[propertyNames[j]] = row[j];
            }
        }
        objects.push(thisObject);
    }
    return objects;
}

function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
}