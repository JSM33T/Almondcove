# Almoncove Overview

## Intro

AlmondCove is an online webspace which showcases music , blogs, and other artifacts i want toshare with world.
Frontend compises of Angular 17 (standalone module) with backend running on battle tested C# with SQL Server as the DB.

### Description

AlmondCove is a web application designed to provide a seamless user experience for browsing blogs, accessing studio resources, and utilizing various applications. The project uses a .NET Core Web API backend with an Angular front end.

### Technologies Used

- **Backend**: .NET Core Web API
- **Frontend**: Angular
- **Database**: SQL Server
- **Hosting**: IIS on Windows Server
- **CI/CD**: Azure DevOps

### Backend

- **Framework**: .NET 8
- **Architecture**: RESTful API
- **Database ORM**: Dapper
- **Authentication**: JWT Bearer Tokens
- **Logging**: Serilog

### Frontend

- **Framework**: Angular 18 (standalone)
- **State Management**: NgRx
- **Routing**: Angular Router
- **Styling**: CSS
- **Component Library**: Vendor*

### Features

- **User Authentication**: ID

### Deployment

- **API**: Deployed on IIS with a Windows Server.
- **UI**: Automated builds and deployments using Vercel.

### Development Tools

- **IDE**: Visual Studio 2022, Visual Studio Code
- **Version Control**: Git
- **Package Management**: npm, NuGet

### Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/JSM33T/Almondcove.git
    ```

2. **Backend**:
    - Navigate to the backend project directory and restore dependencies:

        ```bash
        cd AlmondCove/API
        dotnet restore
        ```

    - Update the database connection string in `appsettings.Development.json`.
    - Run the application:

        ```bash
        dotnet run
        ```

3. **Frontend**:
    - Navigate to the frontend project directory and install dependencies:

        ```bash
        cd AlmondCove/UI
        npm install
        ```

    - Run the application:

        ```bash
        ng serve
        ```

4. **Access the application**:
    - Open your browser and navigate to `http://localhost:4200` for the frontend.
    - The backend API can be accessed at `http://localhost:5000/api`.

### Contributing

- Fork the repository
- Create a new branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/your-feature`)
- Open a Pull Request

### License

NA
