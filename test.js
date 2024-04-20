const fs = require('fs');
const path = require('path');

function createDB(Database_Name) {
    const DBNameString = String(Database_Name);
    if (DBNameString !== Database_Name) {
        throw new Error('Error: Database name must be convertible to a string.');
    }

    const DB = DBNameString;
    fs.mkdir(DB, (err) => {
        if (err) {
            console.error("Error creating database:", err);
        } else {
            console.log("Database created successfully");
        }
    });
}

function createTable(Database, Table_Name) {
    const DBString = String(Database);
    if (DBString !== Database) {
        throw new Error('Error: Database name must be convertible to a string.');
    }

    const TableString = String(Table_Name);
    if (TableString !== Table_Name) {
        throw new Error('Error: Table name must be convertible to a string.');
    }

    const filePath = path.join(DBString, TableString);

    fs.writeFile(filePath, '', 'utf8', (err) => {
        if (err) {
            console.error(`Error creating table '${filePath}':`, err);
        } else {
            console.log(`Table '${filePath}' created successfully!`);
        }
    });
}

function createRecord(Database, Table_Name, record) {
    const DBstring = String(Database);
    if (DBstring !== Database) {
        throw new Error('Error: Database name must be convertible to a string.');
    }

    const TableString = String(Table_Name);
    if (TableString !== Table_Name) {
        throw new Error('Error: Table name must be convertible to a string.');
    }

    const filePath = path.join(DBstring, TableString);

    const jsonString = JSON.stringify(record, null, 2);

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing record to table '${filePath}':`, err);
        } else {
            console.log(`Record written to table '${filePath}' successfully!`);
        }
    });
}

function readDatabase(Database) {
    const DBstring = String(Database);
    if (DBstring !== Database) {
        throw new Error("Error: Database name must be convertible to a string.");
    }

    fs.readdir(DBstring, (err, files) => {
        if (err) {
            console.error("Error reading the database:", err);
        } else {
            console.log("Database read successfully:", files);
        }
    });
}

function readTable(Database, Table_Name) {
    const DBString = String(Database);
    if (DBString !== Database) {
        throw new Error('Error: Database name must be convertible to a string.');
    }

    const TableString = String(Table_Name);
    if (TableString !== Table_Name) {
        throw new Error('Error: Table name must be convertible to a string.');
    }

    const filePath = path.join(DBString, TableString);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading table '${filePath}':`, err);
        } else {
            console.log(`Table '${filePath}' read successfully! Data:`, data);
        }
    });
}

function updateDB(Database, newName) {
    const DBstring = String(Database);
    const newNameString = String(newName);

    if (DBstring !== Database || newNameString !== newName) {
        throw new Error('Error: Database and new name must be strings.');
    }

    fs.rename(DBstring, newNameString, (err) => {
        if (err) {
            console.error(`Error renaming database '${DBstring}' to '${newNameString}':`, err);
        } else {
            console.log(`Database '${DBstring}' renamed to '${newNameString}' successfully!`);
        }
    });
}

function updateTable(Database, Table_Name, newRecord) {
    const DBstring = String(Database);
    const TableString = String(Table_Name);

    if (DBstring !== Database || TableString !== Table_Name) {
        throw new Error('Error: Database and Table names must be strings.');
    }

    const filePath = path.join(DBstring, TableString);

    fs.readFile(filePath, 'utf8', (err, existingRecord) => {
        if (err) {
            console.error(`Error reading table '${filePath}' for update:`, err);
        } else {
            let existingData;

            try {
                existingData = JSON.parse(existingRecord);
                if (!Array.isArray(existingData)) {
                    existingData = [existingData];
                }

                existingData.push(newRecord);

                const updatedData = JSON.stringify(existingData, null, 2);

                fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error(`Error updating table '${filePath}':`, writeErr);
                    } else {
                        console.log(`Table '${filePath}' updated successfully!`);
                    }
                });
            } catch (parseError) {
                console.error(`Error parsing JSON in table '${filePath}':`, parseError);
            }
        }
    });
}

function deleteTable(Database, Table_Name) {
    const DBstring = String(Database);
    const TableString = String(Table_Name);

    if (DBstring !== Database || TableString !== Table_Name) {
        throw new Error('Error: Database and Table names must be strings.');
    }

    const filePath = path.join(DBstring, TableString);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting table '${filePath}':`, err);
        } else {
            console.log(`Table '${filePath}' deleted successfully!`);
        }
    });
}

function deleteDatabase(Database) {
    const DBstring = String(Database);

    if (DBstring !== Database) {
        throw new Error('Error: Database name must be convertible to a string.');
    }

    fs.rmdir(DBstring, { recursive: true }, (err) => {
        if (err) {
            console.error(`Error deleting database '${DBstring}':`, err);
        } else {
            console.log(`Database '${DBstring}' deleted successfully!`);
        }
    });
}

function createDataBase() {
    createDB('Google');
}

function tableCreation() {
    createTable('Google', 'employee.json');
}

// function recordCreation() {
//     const record = {
//         key1: 'value1',
//         key2: 'value2',
//         key3: [1, 2, 3],
//     };
//     createRecord('Google', 'employee.json', record);
// }

// function TableRead() {
//     readTable('Google', 'employee.json');
// }

// function readDB() {
//     readDatabase('Google');
// }

// function updateDataBase() {
//     updateDB('Google', 'Amazon');
// }

// function tableUpdation() {
//     const new_record = {
//         key1: 'value69',
//         key2: 'value96',
//         key3: [4, 5, 6],
//     };

//     updateTable('Amazon', 'employee.json', new_record);
// }

// function tableDeletion() {
//     deleteTable('Google', 'employee.json');
// }

createDataBase();
tableCreation();
// recordCreation();
// TableRead();
// readDB();
// updateDataBase();
// tableUpdation();
// tableDeletion();
