@echo off
title Hostel Management & Assistance System
echo ========================================================
echo   HOSTELCARE - JAVASCRIPT FRAMEWORK (REACT) PROJECT
echo ========================================================
echo.
echo Starting local development server on port 3000...
echo Opening HostelCare in your default web browser...
echo.

start "" "http://localhost:3000"
python -m http.server 3000 --bind 127.0.0.1
pause
