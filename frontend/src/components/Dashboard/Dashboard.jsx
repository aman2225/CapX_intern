import { useEffect, useState, useCallback } from "react";
import {
  fetchStockHoldings,
  fetchStockProfile,
  fetchStock,
  deleteStock,
} from "../utils/api";
import ConfirmationModal from "./ConfirmationModal";
import loadingSVG from "../../assets/loading.svg";

const Dashboard = () => {
  const [stockHoldings, setStockHoldings] = useState([]);
  const [stocksProfiles, setStocksProfiles] = useState({});
  const [currentStocks, setCurrentStocks] = useState({});
  const [currentValue, setCurrentValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);

  // Fetch stock holdings
  const getStockHoldings = async () => {
    const data = await fetchStockHoldings();
    setStockHoldings(data);
    if (data.length === 0) {
      setLoading(false);
    }
  };

  // Fetch stock profiles
  const getStocksProfiles = useCallback(async () => {
    const stockSymbols = stockHoldings.map((stock) => stock.id.stockSymbol);
    const data = await Promise.all(
      stockSymbols.map(async (symbol) => {
        const stock = await fetchStockProfile(symbol);
        return stock;
      })
    );
    const stockProfilesMap = {};
    data.forEach((stock) => {
      stockProfilesMap[stock.ticker] = stock;
    });
    setStocksProfiles(stockProfilesMap);
    setLoading(false);
  }, [stockHoldings]);

  // Delete stock
  const handleDeleteClick = (stockSymbol) => {
    setStockToDelete(stockSymbol);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (stockToDelete) {
      await deleteStock(stockToDelete);
      setStockHoldings((prev) =>
        prev.filter((stock) => stock.id.stockSymbol !== stockToDelete)
      );
    }
    setIsConfirmModalVisible(false);
    setStockToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmModalVisible(false);
    setStockToDelete(null);
  };

  const getInvestedValue = () => {
    return stockHoldings.reduce((acc, stock) => {
      return acc + stock.boughtPrice * stock.quantity;
    }, 0);
  };

  // Fetch stock holdings on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getStockHoldings();
    };
    fetchData();
  }, []);

  // Fetch stock profiles when stock holdings change
  useEffect(() => {
    if (stockHoldings.length > 0) getStocksProfiles();
  }, [stockHoldings, getStocksProfiles]);

  // Update current stock values periodically
  useEffect(() => {
    const interval = setInterval(async () => {
      const stockSymbols = stockHoldings.map((stock) => stock.id.stockSymbol);
      const updatedStocks = await Promise.all(
        stockSymbols.map(async (symbol) => {
          const stock = await fetchStock(symbol);
          return stock;
        })
      );

      // Update current value
      const newCurrentValue = updatedStocks.reduce((acc, stock, index) => {
        const updatedStock = stockHoldings[index];
        return acc + updatedStock.quantity * stock.c;
      }, 0);
      setCurrentValue(newCurrentValue);

      const currentStocksMap = {};
      updatedStocks.forEach((stock, index) => {
        const stockSymbol = stockHoldings[index].id.stockSymbol;
        currentStocksMap[stockSymbol] = stock;
      });
      setCurrentStocks(currentStocksMap);
    }, 5000);

    return () => clearInterval(interval);
  }, [stockHoldings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <img src={loadingSVG} alt="loading" className="bg-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 bg-black text-white px-4 sm:px-6 lg:px-8">
      {isConfirmModalVisible && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h2>
        <button
          className="bg-green-400 text-white px-4 py-2 rounded-full"
          onClick={() => console.log("Add stock functionality")}
        >
          Add Stocks
        </button>
      </div>

      <div className="border-2 rounded-2xl p-6 mt-5">
        <div className="flex flex-col sm:flex-row justify-around text-center">
          <div>
            <p className="text-2xl">{`$${getInvestedValue().toFixed(2)}`}</p>
            <p>Invested Value</p>
          </div>
          <div>
            <p className="text-2xl">{`$${currentValue.toFixed(2)}`}</p>
            <p>Current Value</p>
          </div>
        </div>
        <hr className="my-5" />

        {stockHoldings.length === 0 ? (
          <p className="text-center">No stocks in your portfolio</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-700 text-left">
                  <th className="py-2 px-4">Company Name</th>
                  <th className="py-2 px-4">Symbol</th>
                  <th className="py-2 px-4">Bought Price</th>
                  <th className="py-2 px-4">Current Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total Investment</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stockHoldings.map((stock, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">
                      {stocksProfiles[stock.id.stockSymbol]?.name || "Unknown"}
                    </td>
                    <td className="py-2 px-4">{stock.id.stockSymbol}</td>
                    <td className="py-2 px-4">{stock.boughtPrice}</td>
                    <td className="py-2 px-4">
                      ${currentStocks[stock.id.stockSymbol]?.c || "0"}
                    </td>
                    <td className="py-2 px-4">{stock.quantity}</td>
                    <td className="py-2 px-4">
                      $
                      {(
                        stock.quantity *
                        (currentStocks[stock.id.stockSymbol]?.c || 0)
                      ).toFixed(2)}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-red-400 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteClick(stock.id.stockSymbol)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

