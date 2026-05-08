# CapX_Portfolio_Dashboard

This is a full-stack service for managing stock investments. The frontend is built using React and Tailwind. The backend is built with Spring Boot and PostgreSQL, and it integrates with **Finnhub API** for real-time stock updates.
Access the frontend at https://cap-x-intern.vercel.app/

# Steps To Run Project

**Frontend:**
```bash

 git clone https://github.com/aman2225/CapX_intern.git

 cd CapX_intern/frontend

 npm install

 npm run dev

``` 

This repository contains the backend API for a **Live Stock Market Portfolio App**, built with **Spring Boot** and deployed on [Render](https://render.com). The API serves as the backend layer for managing stock portfolios, providing real-time stock data, user authentication, and other essential features.

## 🔗 API Base URL

All API endpoints are accessible at:  
**[https://capx-backend-5e5x.onrender.com/api](https://capx-backend-5e5x.onrender.com/api)**

---

## 🚀 Features

- **Portfolio Management**: Add, update, or remove stocks in a user's portfolio.
- **Real-Time Stock Data**: Fetch live stock prices and historical data.
- **Performance Analysis**: Track portfolio performance over time.

---

## 🛠️ Tech Stack
- **Frontend**: React with vite, Tailwind CSS.
- **Backend Framework**: Spring Boot
- **Database**: PostgreSQL
- **Deployment**: Render.com
- **APIs Consumed**: Stock market APIs like Finhub

## Steps to run backend

```bash
cd CapX_intern/backend

./mvnw clean install

./mvnw spring-boot:run

```

## Limitation

1. The free tier of the Finnhub API allows up to 60 requests per minute, meaning stock data updates will pause once this limit is exceeded.
2. Only stocks listed in the Finnhub API can be added.