import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useContext } from "react";
import { makeTimestampReadable, getCategoryNameById } from "../utils/helper";
import { ALL_CATEGORIES, ALL_TRANSACTIONS } from "../utils/url-constants";

const fetchCategories = () => {
  const response = axios.get(ALL_CATEGORIES);
  return response;
};

const fetchAllTransactions = async (categoryId, orderBy) => {
  try {
    let filterQuery = "/?";
    if (categoryId) filterQuery = filterQuery + "categoryId=" + categoryId;
    if (categoryId && orderBy) filterQuery = filterQuery + "&";
    if (orderBy) filterQuery = filterQuery + "orderByDate=" + orderBy;
    // console.log(filterQuery);

    const headerConfig = {
      headers: {
        authToken: localStorage.getItem("authToken"),
      },
    };
    const response = await axios.get(
      ALL_TRANSACTIONS + filterQuery,
      headerConfig
    );

    return response;
  } catch (error) {
    console.log("Quering failed :", error);
    return error;
  }
};

const Transactions = () => {
  const [category, setCategory] = useState(null);
  const [orderBy, setOrderBy] = useState("ASC");
  //   const { clientUserId } = useContext(AuthContext);
  //   console.log(clientUserId);
  // query for category
  const { data: categories, isLoading: isCategoryLoading } = useQuery(
    ["categories"],
    fetchCategories
  );
  //   console.log(categories?.data?.data);
  //   query for transactions
  const { data: allTransactions, isLoading: isAllTransactionsLoading } =
    useQuery(
      ["transactions", category, orderBy],
      () => fetchAllTransactions(category, orderBy)
      //   {
      //     enabled: !!category,
      //   }
    );
  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const changeOrderByHandler = (event) => {
    setOrderBy(event.target.value);
  };

  //   console.log(allTransactions?.data?.data);
  if (isCategoryLoading) {
    return (
      <h1 className="text-2xl font-semibold text-center">
        Categories are being fetched ...
      </h1>
    );
  }

  return (
    <div className="transaction-page container py-4">
      <h1 className="text-2xl font-semibold text-center">
        Transaction : Page in Progress
      </h1>
      <div className="filters py-8 flex gap-16 justify-center">
        <div className="select-tag flex flex-col gap-2 font-semibold ">
          <label htmlFor="category-select" className="text-center">
            Category
          </label>
          <select
            name="category"
            id="category-select"
            onChange={changeCategoryHandler}
            className="rounded p-2"
          >
            <option value=""></option>
            {categories?.data?.data?.map((category, idx) => {
              return (
                <option value={category.id} key={idx}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="select-tag flex flex-col gap-2 font-semibold ">
          <label htmlFor="order-select" className="text-center">
            Sort by date
          </label>
          <select
            name="order"
            id="order-select"
            onChange={changeOrderByHandler}
            className="rounded p-2"
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      </div>
      {isAllTransactionsLoading ? (
        <h1 className="text-2xl font-semibold text-center">
          Transactions are Loading
        </h1>
      ) : (
        <div className="transaction-list p-8 flex flex-col gap-4 items-center">
          {allTransactions?.data?.data.map((transaction, idx) => {
            return (
              <div
                className="transcation-card block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:bg-gray-100"
                key={idx}
              >
                <span className="py-1 px-2 rounded-full bg-cyan-700 text-white text-xs">
                  {getCategoryNameById(
                    categories.data.data,
                    transaction.CatagoryId
                  )}
                </span>
                <h3 className="text-4xl my-1"> ₹ {transaction.amount}</h3>
                <p>{makeTimestampReadable(transaction.createdAt)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Transactions;
