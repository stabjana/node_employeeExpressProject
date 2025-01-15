# **Node.js Employee Express Project**

## **Overview**

This project is a web-based employee management system built with Node.js, Express, and EJS. It allows users to add, update, search, and delete employee records stored in a JSON file. A structured storage layer ensures all operations on data are handled efficiently.

---

## **How To run it**

1. to install the dependencies run

```shell
npm install
```

2. after the installation you can run it with

```shell
node index
```

note: you have to be in the main project folder (other: you can write node in your console and drag and drop the index.js to the terminal)

---

## **Main Features**

1. **Home Page**  
   The app starts with a simple homepage served at `/`.

2. **View All Employees**  
   At `/all`, you can see a list of all employees, displayed dynamically using the `allPersons.ejs` template.

3. **Search Employees**  
   You can search for an employee by ID.

   - The search form is available at `/search`.
   - After submitting, details are shown on a new page (`personPage.ejs`).

4. **Add New Employees**  
   There are two forms to add employees:

   - `/inputform` uses `form.ejs` for a basic form.
   - `/inputform2` uses `form2.ejs`, with fields defined in the backend for more flexibility.  
     Submitted data is saved to the database.

5. **Update Employee Data**

   - First, find the employee to update (`/newupdateform` or `/updateform`).
   - After selecting, you'll see a pre-filled form at `/updatestage2` where you can edit details.
   - Finally, submit the updates at `/updatestage3`.

6. **Remove Employees**
   - At `/remove`, use the search form to specify which employee to delete.
   - After submission, the record is removed from the database.

---

## **How It Works**

The app uses a structured storage layer with several helper files:

- `dataStorageLayer.js` handles database operations.
- `readerWriter.js` takes care of reading and writing to the JSON file.
- `statuscodes.js` defines success and error codes.
- `storagelayer.js` ensures data is converted and validated correctly.

EJS templates (`allPersons.ejs`, `form.ejs`, `form2.ejs`, etc.) dynamically generate the pages based on data. Static assets like CSS and images are served from the `public` folder. The server settings (port and host) are in `config.json`.

---

## Licences

check for the licenses

```shell
npx license-checker --summary
```

with using the code of someone else, you agree with the license automatically
