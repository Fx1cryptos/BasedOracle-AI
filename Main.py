from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from services.wallet_analysis import get_wallet_overview, get_wallet_transactions
from services.trading_engine import simulate_trade
from services.airdrop_engine import check_airdrop_eligibility
from services.ecosystem_monitor import get_trending_projects

app = FastAPI(
    title="BasedOracle AI",
    description="Base-native AI agent for wallet analysis, trading, airdrops, and onchain intelligence",
    version="1.0.0"
)

# Serve frontend
@app.get("/", response_class=HTMLResponse)
def root():
    with open("index.html", "r") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content, status_code=200)

# Wallet analysis endpoint
@app.get("/wallet/{address}")
def wallet_analysis(address: str):
    overview = get_wallet_overview(address)
    txs = get_wallet_transactions(address)
    return {
        "overview": overview,
        "recent_transactions": txs[:5]
    }

# Trading simulation
@app.post("/trade/simulate")
def trade_simulation(token: str, amount: float):
    return simulate_trade(token, amount)

# Airdrop check
@app.get("/airdrop/{wallet}")
def airdrop(wallet: str):
    return check_airdrop_eligibility(wallet)

# Trending projects
@app.get("/ecosystem/trending")
def trending_projects():
    return {"trending": get_trending_projects()}
