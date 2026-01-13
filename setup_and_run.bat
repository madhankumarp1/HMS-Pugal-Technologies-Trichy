@echo off
echo HMS Pugal Technologies - Website Setup
echo =======================================
echo.
echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo.
echo Installing dependencies (this may take a minute)...
call npm install

echo.
echo Starting development server...
echo The website will open in your browser shortly.
start http://localhost:5173
call npm run dev

pause
