# Image Grid Overlay

A simple, client-side web application built with React and Vite that allows users to upload an image, overlay a customizable grid, and download the result. This tool is perfect for tabletop RPG players, artists, or anyone needing to add a precise grid to an image.

## Features

-   **Image Upload:** Upload any image file (PNG, JPG, GIF) from your local machine.
-   **Customizable Grid:**
    -   Adjust the grid size (cell width and height).
    -   Change the grid line thickness, including decimal values.
    -   Select any color for the grid lines.
-   **Interactive Positioning:**
    -   Use sliders for precise horizontal and vertical offset control.
    -   Click and drag the grid directly on the image for intuitive placement.
-   **Live Preview:** All changes to the grid are rendered in real-time over the image.
-   **Download/Export:** Merge the grid and the image and download the final product as a high-quality PNG file.

## Tech Stack

-   **Framework:** React 19
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS
-   **Linting:** ESLint

## Prerequisites

Before you begin, ensure you have the following installed on your system:
-   [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Quick Start

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/map-grid.git](https://github.com/your-username/map-grid.git)
    cd map-grid
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    or if you use Yarn:
    ```sh
    yarn install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal) to see the application.

## Available Scripts

In the project directory, you can run the following commands:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
-   `npm run lint`: Lints the project files for code quality and style issues using ESLint.
-   `npm run preview`: Serves the production build from the `dist` folder locally to preview it before deployment.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
