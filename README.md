# Contact-Meeno Project README

Welcome to the **Contact-Meeno** project, a Contact Management App designed to provide an efficient and user-friendly way to manage contacts, visualize COVID-19 data, and explore charts and maps. This application is built using TypeScript, Chart.js, react-chartjs-2, Tailwind CSS, React Router, React Query, and React Leaflet.

![Screenshot_32](https://github.com/TusharTechs/ContactMeeno/assets/56952465/6a27a1bf-e9f2-483d-b388-e823316c0d5e)

## Features

- **Dashboard Page (/):** The dashboard page serves as the main landing page and displays essential information related to COVID-19. It utilizes data from an external API to show COVID-19 statistics, and it also presents a chart and a map component for visualizing the data.

- **Contacts Page (/contacts):** The contacts page offers a comprehensive contact management system. Users can view, create, edit, and delete contact information. The data is stored in a MongoDB database, ensuring persistence and reliability.

- **Charts and Maps Page (/charts-and-maps):** This page is dedicated to presenting data visualizations. It includes a chart showcasing COVID-19 cases fluctuation over different years using `react-chartjs-2` and `Chart.js`. Additionally, there's a map component powered by `React Leaflet`, which displays country-specific COVID-19 statistics.

## Deployed Link

[ContactMeeno](https://contact-meeno.vercel.app/)

## Installation

1. Clone this repository to your local machine using:

`git clone https://github.com/your-username/contact-meeno.git`

2. Navigate to the project directory:

`cd contact-meeno`

3. Install the required dependencies:

`npm install`

4. Create a `.env` file in the root directory for environment variables like API keys and database connection details.

`DB_URL=your_mongodb_url`

5. Start the development server:

`npm run dev`

6. Access the application at `[http://localhost:3000](http://localhost:5173)` in your web browser.

## Dependencies

- TypeScript
- React
- Chart.js
- react-chartjs-2
- Tailwind CSS
- React Router
- React Query
- Leaflet
- React Leaflet

## Contributing

Contributions to this project are welcomed and encouraged. If you encounter any bugs, have suggestions for improvements, or want to add new features, please submit issues or pull requests through GitHub.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for choosing **Contact-Meeno** for your contact management needs. If you have any questions or need further assistance, please don't hesitate to contact us at tusharaggarwal274@gmail.com. We hope you find our application both helpful and user-friendly!
