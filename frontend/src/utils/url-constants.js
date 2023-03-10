const MONEY_TRACKER_BASE_URL = process.env.REACT_APP_MONEY_TRACKER_BASE_URL;

const API_URL = `${MONEY_TRACKER_BASE_URL}/api/v1`;

export const GITHUB_REPO_LINK = "https://github.com/guptavarun619/MoneyTracker";

export const SIGNUP_URL = `${API_URL}/signup`;
export const SIGNIN_URL = `${API_URL}/signin`;

// Category api URLs
export const ALL_CATEGORIES = `${API_URL}/category`;
export const CREATE_CATEGORY = `${API_URL}/category`;

// Transaction api URLs
export const CREATE_TRANSACTION = `${API_URL}/transaction`;
export const ALL_TRANSACTIONS = `${API_URL}/transaction`;
export const DELETE_TRANSACTION = `${API_URL}/transaction`;
